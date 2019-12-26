import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';
import getToken from '../getToken';

describe('Student', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to list students', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get('/students')
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to find student by ID', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .get(`/students/${1}`)
      .set('Authorization', `bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should be able to register a new student', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(200);
  });

  it('should not be able to register a new student when some field is missing', async () => {
    const student = {
      name: 'Student test',
      age: 25,
      weight: 80,
      height: 1.81,
    };

    const { body } = await getToken();

    const { status } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should not be able to register student with duplicated email', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });

  it('should be able to update student', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedStudent = await request(app)
      .put(`/students/${studentID.id}`)
      .send({
        name: 'Updated Name',
        email: 'email@email.com',
        age: 25,
        weight: 80,
        height: 1.81,
      })
      .set('Authorization', `bearer ${body.token}`);

    expect(updatedStudent.body.name).toBe('Updated Name');
  });

  it('should not be able to update student if fail validation', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const updatedStudent = await request(app)
      .put(`/students/${studentID.id}`)
      .send({})
      .set('Authorization', `Bearer ${body.token}`);

    expect(updatedStudent.status).toBe(400);
  });

  it('should be able to delete a student', async () => {
    const student = await factory.attrs('Student');

    const { body } = await getToken();

    const { body: studentID } = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${body.token}`);

    const { status } = await request(app)
      .delete(`/students/${studentID.id}`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(204);
  });

  it('should not be able to delete a student if it does not exist', async () => {
    const { body } = await getToken();

    const { status } = await request(app)
      .delete(`/students/0`)
      .set('Authorization', `Bearer ${body.token}`);

    expect(status).toBe(400);
  });
});
