import supertest from 'supertest';
import app from '../../index';
import { createJWTToken } from '../../helpers';

const request = supertest(app);
const token: string = createJWTToken(1, 'bearer');

describe('User handler: ', () => {
  it('/user should return a new order ', () => {
    const data = {
      firstName: 'Laila',
      lastName: 'Islam',
      email: 'hebaz.islam@gmail.com',
      password: 'testc'
    };
    request
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(201)
      .expect({
        statusCode: 200,
        message: 'user has been succesfully created.',
        data: {
          firstName: 'Laila',
          lastName: 'Islam',
          email: 'hebaz.islam@gmail.com',
          password: 'testc'
        },
        token
      });
  });

  it('api/users should update user', () => {
    const data = [
      {
        id: 4,
        email: 'hebaz.islam@gmail.com',
        firstname: 'Laila',
        lastname: 'Islam'
      }
    ];
    request
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect(data);
  });

  it('/api/users/1', () => {
    const data = {
      firstName: 'Heba',
      lastName: 'Islam',
      email: 'hebaz.islam@gmail.com',
      password: 'testc'
    };
    request
      .put('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .expect({
        statusCode: 200,
        message: 'user has been succesfully updated.',
        data: {
          firstName: 'Heba',
          lastName: 'Islam',
          email: 'hebaz.islam@gmail.com'
        }
      });
  });
});
