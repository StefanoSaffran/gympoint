import * as Yup from 'yup';
import Order from '../models/Order';
import Student from '../models/Student';

import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { answer } = req.body;

    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (order && order.answer) {
      return res.status(401).json({
        error: 'This order was already answered',
      });
    }

    order.answer = answer;
    order.answer_at = new Date();

    await order.save();

    const ownerSocket = req.connectedUsers[order.student.id];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('order_response', order);
    } else {
      await Queue.add(HelpOrderAnswerMail.key, {
        order,
      });
    }

    return res.json(order);
  }

  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        answer: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new AnswerController();
