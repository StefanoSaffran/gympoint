import * as Yup from 'yup';
import Order from '../models/Order';
import Student from '../models/Student';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { question } = req.body;

    const checkStudentExists = await Student.findByPk(req.params.id);

    if (!checkStudentExists) {
      return res.status(401).json({ error: 'Student not found' });
    }

    await Order.create({
      student_id: req.params.id,
      question,
    });

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
