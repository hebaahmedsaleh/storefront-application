import supertest from 'supertest';
import app from '../../index';
import { createJWTToken } from '../../helpers';

const request = supertest(app);
const token: string = createJWTToken(1, 'bearer');

describe('Product handler: ', () => {
  it('/products should return created product ', () => {
    const data = {
      p_name: 'watch',
      price: 55,
      category: 'acessorise'
    };
    request
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect('Content-Type', 'application/json')
      .expect(201)
      .expect({
        statusCode: 200,
        message: 'Product has been succesfully created.',
        data: {
          price: 55,
          category: 'acessorise'
        }
      });
  });

  it('api/products/1 should update Product', () => {
    const data = {
      p_name: 'bag',
      price: 33,
      category: 'acessorise'
    };
    request
      .put('/api/Products/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .expect({
        statusCode: 200,
        message: 'Product has been succesfully updated.',
        data: {
          price: 33,
          category: 'acessorise'
        }
      });
  });

  it('/api/Products/1', () => {
    const data = {
      pid: 1,
      p_name: 'bag',
      price: 33,
      category: 'acessorise'
    };
    request.get('/api/products/1').expect(200).expect(data);
  });

  it('/api/Products', () => {
    const data = [
      {
        pid: 1,
        p_name: 'bag',
        price: 33,
        category: 'acessorise'
      }
    ];
    request.get('/api/products').expect(200).expect(data);
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
