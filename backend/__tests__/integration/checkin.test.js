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
});
