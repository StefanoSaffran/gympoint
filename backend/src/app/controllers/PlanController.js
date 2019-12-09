import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .integer(),
      price: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists)
      return res.status(400).json({ error: 'Plan already exists.' });

    const { id } = await Plan.create(req.body);

    return res.json({
      id,
    });
  }

  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({
        error: 'Plan does not exist',
      });
    }

    const { title } = req.body;

    if (title && title !== plan.title) {
      const checkTitle = await Plan.findOne({
        where: { title },
      });

      if (checkTitle) {
        return res.status(401).json({
          error: 'Plan title must be unique',
        });
      }
    }

    const { duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    await plan.destroy();

    return res.status(204).send();
  }
}

export default new PlanController();
