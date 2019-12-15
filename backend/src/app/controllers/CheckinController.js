import { startOfDay, endOfDay, subDays } from 'date-fns';
import { Op } from 'sequelize';
import Membership from '../models/Membership';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const checkStudentExists = await Student.findByPk(req.params.id);

    if (!checkStudentExists) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const checkStudentHasMembership = await Membership.findOne({
      where: {
        student_id: req.params.id,
      },
    });

    if (!checkStudentHasMembership) {
      return res
        .status(401)
        .json({ error: 'Students need a membership to check-in' });
    }

    const checkCheckinToday = await Checkin.findOne({
      where: {
        student_id: req.params.id,
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
        student_id: req.params.id,
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
      student_id: req.params.id,
    });

    return res.json(checkin);
  }

  async index(req, res) {
    const checkStudentExists = await Student.findByPk(req.params.id);

    if (!checkStudentExists) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const checkStudentHasMembership = await Membership.findOne({
      where: {
        student_id: req.params.id,
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

    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
      },
    });

    return res.json({
      checkins,
      membership: checkStudentHasMembership,
    });
  }
}

export default new CheckinController();
