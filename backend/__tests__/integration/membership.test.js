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

  it('should be able to register a new membership', async () => {
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

    const { status } = await request(app)
      .post('/memberships')
      .send({
        start_date: new Date(),
        plan_id: planID.id,
        student_id: studentID.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should not be able to register a new membership when plan is not found', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/memberships')
      .send({
        start_date: new Date(),
        plan_id: 0,
        student_id: studentID.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });

  it('should not be able to register a new membership when student is not found', async () => {
    const plan = await factory.attrs('Plan');

    const { body } = await getToken();

    const { body: planID } = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/memberships')
      .send({
        start_date: new Date(),
        plan_id: planID.id,
        student_id: 0,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(401);
  });

  it('should not be able to register a new membership when it does not pass validation', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .post('/memberships')
      .send({
        plan_id: 0,
        student_id: 0,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register a membership to a student that already has a active membership', async () => {
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

    const { status } = await request(app)
      .post('/memberships')
      .send({
        start_date: new Date(),
        plan_id: planID.id,
        student_id: studentID.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register a membership starting with past dates', async () => {
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

    const { status } = await request(app)
      .post('/memberships')
      .send({
        start_date: subDays(new Date(), 1),
        plan_id: planID.id,
        student_id: studentID.id,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should be able to list memberships', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/memberships')
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to find membership by student ID', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get(`/memberships/${1}`)
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to update a membership', async () => {
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

    const updatedMembership = await request(app)
      .put(`/memberships/${studentID.id}`)
      .send({
        start_date: addDays(new Date(), 2),
        plan_id: planID.id,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedMembership.body.start_date).not.toBe(addDays(new Date(), 1));
    expect(updatedMembership.status).toBe(200);
  });

  it('should not be able to update a membership if it does not pass validation', async () => {
    const { body } = await getToken();

    const updatedMembership = await request(app)
      .put(`/memberships/${0}`)
      .send({})
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedMembership.status).toBe(400);
  });

  it('should not be able to update a membership if student is not found', async () => {
    const { body } = await getToken();

    const updatedMembership = await request(app)
      .put(`/memberships/${0}`)
      .send({
        start_date: addDays(new Date(), 2),
        plan_id: 0,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedMembership.status).toBe(400);
  });

  it('should not be able to update a membership when it is active', async () => {
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

    const updatedMembership = await request(app)
      .put(`/memberships/${studentID.id}`)
      .send({
        start_date: addDays(new Date(), 2),
        plan_id: planID.id,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedMembership.status).toBe(400);
  });

  it('should not be able to update a membership starting with past date', async () => {
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

    const updatedMembership = await request(app)
      .put(`/memberships/${studentID.id}`)
      .send({
        start_date: subDays(new Date(), 3),
        plan_id: planID.id,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedMembership.status).toBe(400);
  });

  it('should not be able to update a membership if plan is not found', async () => {
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

    const updatedMembership = await request(app)
      .put(`/memberships/${studentID.id}`)
      .send({
        start_date: addDays(new Date(), 3),
        plan_id: 0,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedMembership.status).toBe(401);
  });

  it('should be able to delete a membership', async () => {
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
      .delete(`/memberships/${studentID.id}`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(204);
  });

  it('should not be able to delete a membership if it does not exist', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .delete(`/memberships/0`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });
});
