import * as Yup from 'yup';
import Order from '../models/Order';
import Student from '../models/Student';
import Membership from '../models/Membership';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { id } = req.params;
    const { question } = req.body;

    const checkStudentExists = await Student.findByPk(id);

    if (!checkStudentExists) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const checkStudentHasMembership = await Membership.findOne({
      where: {
        student_id: id,
      },
    });

    if (!checkStudentHasMembership) {
      return res
        .status(401)
        .json({ error: 'Students need a membership to create orders' });
    }

    if (!checkStudentHasMembership.active) {
      return res
        .status(401)
        .json({ error: 'Membership must be active to create orders' });
    }

    const newOrder = await Order.create({
      student_id: id,
      question,
    });

    const data = {
      id: newOrder.id,
      question: newOrder.question,
      student: {
        id: checkStudentExists.id,
        name: checkStudentExists.name,
      },
    };

    const ownerSocket = req.admin;

    if (ownerSocket) {
      req.io.to('admin').emit('new_order', data);
    }

    return res.status(204).send();
  }

  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        student_id: req.params.id,
      },
    });

    return res.json(orders);
  }
}

export default new OrderController();
