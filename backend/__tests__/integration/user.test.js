import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should enccrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('must have to send all data', async () => {
    const user = await request(app)
      .post('/users')
      .send({});

    expect(user.status).toBe(400);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should update name, email and password', async () => {
    const user = await factory.attrs('User', {
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send(user);

    const { body } = await request(app)
      .post('/sessions')
      .send(user);

    user.token = body.token;

    const updatedUser = await request(app)
      .put('/users')
      .send({
        name: 'Updated Name',
        email: 'email@email.com',
        oldPassword: '123456',
        password: '123123',
        confirmPassword: '123123',
      })
      .set('Authorization', `bearer ${user.token}`);

    expect(updatedUser.body).toHaveProperty('id');
  });

  it("shouldn't update user password when the password doesn't match the user password", async () => {
    const user = await factory.attrs('User', {
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send(user);

    const { body } = await request(app)
      .post('/sessions')
      .send(user);

    user.token = body.token;

    const updatedUser = await request(app)
      .put('/users')
      .send({
        name: 'Updated Name',
        email: 'email@email.com',
        oldPassword: 'notTheSame',
        password: '123123',
        confirmPassword: '123123',
      })
      .set('Authorization', `bearer ${user.token}`);

    expect(updatedUser.status).toBe(401);
  });

  it("shouldn't update user password when the oldPassword is not provided", async () => {
    const user = await factory.attrs('User', {
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send(user);

    const { body } = await request(app)
      .post('/sessions')
      .send(user);

    user.token = body.token;

    const updatedUser = await request(app)
      .put('/users')
      .send({
        name: 'Updated Name',
        email: 'email@email.com',
        password: '123123',
        confirmPassword: '123123',
      })
      .set('Authorization', `bearer ${user.token}`);

    expect(updatedUser.status).toBe(401);
  });

  it("shouldn't update user email when email already in use", async () => {
    const user = await factory.attrs('User', {
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send(user);

    await request(app)
      .post('/users')
      .send({ ...user, email: 'email@email.com', password: '123123' });

    const loginResponse = await request(app)
      .post('/sessions')
      .send({ ...user, password: '123456' });

    user.token = loginResponse.body.token;

    const updatedUser = await request(app)
      .put('/users')
      .send({
        email: 'email@email.com',
      })
      .set('Authorization', `bearer ${user.token}`);

    expect(updatedUser.status).toBe(400);
  });

  it("shouldn't update the password because it didn't provide a confirmation password", async () => {
    const user = await factory.attrs('User', {
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send(user);

    const { body } = await request(app)
      .post('/sessions')
      .send(user);

    user.token = body.token;

    const updatedUser = await request(app)
      .put('/users')
      .send({
        oldPassword: '123456',
        password: '123123',
      })
      .set('Authorization', `bearer ${user.token}`);

    expect(updatedUser.status).toBe(400);
  });

  afterAll(async done => {
    done();
  });
});
