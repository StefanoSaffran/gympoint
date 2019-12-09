import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number()
        .required()
        .positive()
        .max(250),
      height: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists)
      return res.status(400).json({ error: 'Student already exists.' });

    const { id } = await Student.create(req.body);

    return res.json({
      id,
    });
  }

  async index(req, res) {
    const { page, filter } = req.query;

    if (filter || page) {
      const { count, rows: students } = await Student.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${filter}%`,
          },
        },
        order: ['name'],
        limit: 10,
        offset: (page - 1) * 10,
      });

      return res.json({ students, count });
    }
    const students = await Student.findAll({
      order: ['name'],
    });

    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .required()
        .positive()
        .max(120)
        .integer(),
      weight: Yup.number()
        .required()
        .positive()
        .max(250),
      height: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const student = await Student.findByPk(id);

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    await student.destroy();

    return res.status(204).send();
  }
}

export default new StudentController();
