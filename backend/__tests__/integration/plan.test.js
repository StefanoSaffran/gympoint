import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('Plan', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to list plans', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/plans')
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to find plan by ID', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get(`/plans/${1}`)
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to register a new plan', async () => {
    const plan = await factory.attrs('Plan');

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should not be able to register a new plan when some field is missing', async () => {
    const plan = {
      title: 'Plan test',
      duration: 25,
    };

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register plan with duplicated title', async () => {
    const plan = await factory.attrs('Plan');

    const { body } = await getToken();

    await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should be able to update plan', async () => {
    const plan = await factory.attrs('Plan');

    const { body } = await getToken();

    const { body: planID } = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedPlan = await request(app)
      .put(`/plans/${planID.id}`)
      .send({
        title: 'Updated title',
        duration: 5,
        price: 100,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedPlan.body.title).toBe('Updated title');
  });

  it('should not be able to update plan if fail validation', async () => {
    const plan = await factory.attrs('Plan');

    const { body } = await getToken();

    const { body: planID } = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedplan = await request(app)
      .put(`/plans/${planID.id}`)
      .send({})
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedplan.status).toBe(400);
  });

  it('should not be able to update plan if plan does not exist', async () => {
    const plan = await factory.attrs('Plan');

    const { body } = await getToken();

    await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedplan = await request(app)
      .put('/plans/0')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedplan.status).toBe(401);
  });

  it('should not be able to update plan with the same title as another plan', async () => {
    const plan_1 = await factory.attrs('Plan');
    const plan_2 = await factory.attrs('Plan');

    const { body } = await getToken();

    await request(app)
      .post('/plans')
      .send(plan_1)
      .set('Authorization', `Bearer ${body.token}`);

    const { body: plan_2_ID } = await request(app)
      .post('/plans')
      .send(plan_2)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedplan = await request(app)
      .put(`/plans/${plan_2_ID.id}`)
      .send(plan_1)
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedplan.status).toBe(401);
  });

  it('should be able to delete a plan', async () => {
    const plan = await factory.attrs('Plan');

    const { body } = await getToken();

    const { body: planID } = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .delete(`/plans/${planID.id}`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(204);
  });

  it('should be able to delete a plan if it does not exist', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .delete(`/plans/0`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });
});
