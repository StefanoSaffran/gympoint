import { startOfDay, endOfDay, subDays } from 'date-fns';
import { Op } from 'sequelize';
import Membership from '../models/Membership';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const { id } = req.params;
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
        .json({ error: 'Students need a membership to check-in' });
    }

    if (!checkStudentHasMembership.active) {
      return res
        .status(401)
        .json({ error: 'Membership must be active to check-in' });
    }

    const checkCheckinToday = await Checkin.findOne({
      where: {
        student_id: id,
        createdAt: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (checkCheckinToday) {
      return res.status(401).json({
        error: 'You already did your check-in today',
      });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (checkins.length >= 5) {
      return res.status(400).json({
        error: 'Access denied. You have reached 5 checkins in the last 7 days',
      });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json(checkin);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;
    const checkStudentExists = await Student.findByPk(id);

    if (!checkStudentExists) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const checkStudentHasMembership = await Membership.findOne({
      where: {
        student_id: id,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    if (!checkStudentHasMembership) {
      return res
        .status(401)
        .json({ error: 'Students need a membership to check-in' });
    }

    const { count, rows: checkins } = await Checkin.findAndCountAll({
      where: {
        student_id: id,
      },
      order: [['createdAt', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json({
      checkins,
      membership: checkStudentHasMembership,
      count,
    });
  }
}

export default new CheckinController();
