import request from 'supertest';

import app from '../src/app';
import factory from './factories';

const getToken = async () => {
  const user = await factory.attrs('User');

  await request(app)
    .post('/users')
    .send(user);

  const { body } = await request(app)
    .post('/sessions')
    .send(user);

  return body.token;
};

export default getToken;
