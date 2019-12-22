import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('HelpOrders', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able list Help Orders from especific student', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app).get(
      `/students/${studentID.id}/help-orders`
    );

    expect(status).toBe(200);
  });

  it('should be able to answer a help order', async () => {
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

    const { body: order } = await request(app)
      .post(`/students/${studentID.id}/help-orders`)
      .send({ question: 'Help test - question' });

    const { status } = await request(app)
      .post(`/help-orders/${order.id}/answer`)
      .send({ answer: 'Help test - answer' })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should not be able to answer a help order if fail validation', async () => {
    const { body } = await getToken();

    await request(app)
      .post(`/help-orders/1/answer`)
      .send({})
      .set('Authorization', `Bearer ${body.token}`);
  });

  it('should not be able to answer a help order that was already answered', async () => {
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

    const { body: order } = await request(app)
      .post(`/students/${studentID.id}/help-orders`)
      .send({ question: 'Help test - question' });

    await request(app)
      .post(`/help-orders/${order.id}/answer`)
      .send({ answer: 'Help test - answer' })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post(`/help-orders/${order.id}/answer`)
      .send({ answer: 'Help test - answer' })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });
});
