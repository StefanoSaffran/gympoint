import request from 'supertest';
import { addDays } from 'date-fns';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('HelpOrders', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able list Help Orders', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/help-orders')
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to create a new help order', async () => {
    const student = await factory.attrs('Student');
    const plan = await factory.attrs('Plan');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { body: planID } = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    await request(app)
      .post('/memberships')
      .send({
        start_date: new Date(),
        plan_id: planID.id,
        student_id: studentID.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post(`/students/${studentID.id}/help-orders`)
      .send({ question: 'Help test' });

    expect(status).toBe(200);
  });

  it('should not be able to create a new help order if membership is not active', async () => {
    const student = await factory.attrs('Student');
    const plan = await factory.attrs('Plan');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { body: planID } = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    await request(app)
      .post('/memberships')
      .send({
        start_date: addDays(new Date(), 2),
        plan_id: planID.id,
        student_id: studentID.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post(`/students/${studentID.id}/help-orders`)
      .send({ question: 'Help test' });

    expect(status).toBe(401);
  });

  it('should not be able to create a new help order if student does not have a membership', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post(`/students/${studentID.id}/help-orders`)
      .send({ question: 'Help test' });

    expect(status).toBe(401);
  });

  it('should not be able to create a new help order if it does not pass validation', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post(`/students/${studentID.id}/help-orders`)
      .send({});

    expect(status).toBe(400);
  });

  it('should not be able to create a new help order if student does not exist', async () => {
    const { status } = await request(app)
      .post(`/students/0/help-orders`)
      .send({ question: 'Help test' });

    expect(status).toBe(401);
  });
});
