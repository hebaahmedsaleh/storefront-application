import supertest from 'supertest';
import app from '../../index';
import { createJWTToken } from '../../helpers';

const request = supertest(app);
const token: string = createJWTToken(1, 'bearer');

describe('order handler: ', () => {
  it('/api/orders should return all orders ', () => {
    request
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(201)
      .expect([]);
  });

  it('api/orders should create order', () => {
    const product = { p_name: 'watch', price: 55, category: 'acessorise' };
    request
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .expect('Content-Type', 'application/json');

    const user = {
      firstName: 'Laila',
      lastName: 'Islam',
      email: 'hebaz.islam@gmail.com',
      password: 'testc'
    };

    request
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect('Content-Type', 'application/json');

    const data = {
      order_status: 'pending',
      quantity: '8',
      user_id: '41',
      product_id: '1'
    };

    request
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        statusCode: 200,
        message: 'Order has been succesfully created.',
        data: {
          order_status: 'pending',
          quantity: '8',
          product_id: '1',
          user_id: '1'
        }
      });
  });

  it('/api/orders/1', () => {
    const data = {
      order_status: 'pending',
      quantity: '8',
      product_id: '1',
      user_id: '1'
    };
    request.get('/api/orders/1').expect(200).expect(data);
  });

  it('/api/orders/1 edit order', () => {
    const data = [
      {
        order_status: 'completed',
        quantity: '8',
        product_id: '1',
        user_id: '1'
      }
    ];
    request
      .put('/api/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        statusCode: 200,
        message: 'Order has been succesfully updated.',
        data: {
          order_status: 'completed',
          quantity: '8',
          product_id: '1',
          user_id: '1'
        }
      });
  });

  it('/api/Products/1 delete product', () => {
    request
      .delete('/api/products/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        statusCode: 200,
        message: 'Product has been succesfully deleted.'
      });
  });
});
