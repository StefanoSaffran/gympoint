import request from 'supertest';
import { subDays, addDays } from 'date-fns';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('Memberships', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able list all checkins from especific student', async () => {
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

    const { status } = await request(app).get(
      `/students/${studentID.id}/checkins`
    );

    expect(status).toBe(200);
  });

  it('should not be able list all checkins when student does not have a membership', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app).get(
      `/students/${studentID.id}/checkins`
    );

    expect(status).toBe(401);
  });

  it('should not be able list all checkins when student is not found', async () => {
    const { status } = await request(app).get(`/students/${0}/checkins`);

    expect(status).toBe(401);
  });

  it('should be able to check-in', async () => {
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

    const { status } = await request(app).post(
      `/students/${studentID.id}/checkins`
    );

    expect(status).toBe(200);
  });

  it('should not be able to check-in when student is not found', async () => {
    const { status } = await request(app).post(`/students/${0}/checkins`);

    expect(status).toBe(401);
  });

  it('should not be able to check-in if student does not have a membership', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app).post(
      `/students/${studentID.id}/checkins`
    );

    expect(status).toBe(401);
  });

  it('should not be able to check-in when the student membership is not active', async () => {
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
        start_date: addDays(new Date(), 1),
        plan_id: planID.id,
        student_id: studentID.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app).post(
      `/students/${studentID.id}/checkins`
    );

    expect(status).toBe(401);
  });

  it('should not be able to check-in if the student already did a check-in in the same day', async () => {
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

    await request(app).post(`/students/${studentID.id}/checkins`);
    const { status } = await request(app).post(
      `/students/${studentID.id}/checkins`
    );

    expect(status).toBe(401);
  });

  it('should not be able to check-in if the student has reached 5 check-ins in the last 7 days', async () => {
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

    await factory.create('Checkin', {
      student_id: studentID.id,
      createdAt: subDays(new Date(), 5),
    });
    await factory.create('Checkin', {
      student_id: studentID.id,
      createdAt: subDays(new Date(), 4),
    });
    await factory.create('Checkin', {
      student_id: studentID.id,
      createdAt: subDays(new Date(), 3),
    });
    await factory.create('Checkin', {
      student_id: studentID.id,
      createdAt: subDays(new Date(), 2),
    });
    await factory.create('Checkin', {
      student_id: studentID.id,
      createdAt: subDays(new Date(), 1),
    });

    const { status } = await request(app).post(
      `/students/${studentID.id}/checkins`
    );

    expect(status).toBe(400);
  });
});
