import { OrderEntity } from '../../models/order';

const store = new OrderEntity();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });
  it('create method should add a order', async () => {
    const result = await store.create({
      order_status: 'pending',
      quantity: 8,
      user_id: 4,
      product_id: 7
    });

    expect(result).toEqual({
      order_status: 'pending',
      quantity: 8,
      user_id: 4,
      product_id: 7
    });
  });

  it('create method should add a order', async () => {
    const result = await store.update(
      {
        order_status: 'processing',
        quantity: 8,
        user_id: 4,
        product_id: 7
      },
      1
    );

    expect(result).toEqual({
      order_status: 'processing',
      quantity: 8,
      user_id: 4,
      product_id: 7
    });
  });

  it('index method should return a list of Orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        order_status: 'processing',
        quantity: 8,
        user_id: 4,
        product_id: 7
      }
    ]);
  });

  it('show method should return the correct Orders', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      order_status: 'pending',
      quantity: 8,
      user_id: 4,
      product_id: 7
    });
  });

  it('delete method should remove the Product', async () => {
    store.delete('1');
    const result = await store.show('1');

    expect(result).not.toBeDefined();
  });
});
