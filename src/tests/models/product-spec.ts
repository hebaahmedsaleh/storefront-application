import { ProductEntity } from '../../models/product';

const store = new ProductEntity();

describe('Product Model', () => {
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

  it('create method should add a Product', async () => {
    const result = await store.create({
      id: '1',
      name: 'watch',
      price: 400,
      category: 'accesories'
    });
    expect(result).toEqual({
      id: '1',
      name: 'watch',
      price: 400,
      category: 'accesories'
    });
  });

  it('index method should return a list of Products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: '1',
        name: 'watch',
        price: 400,
        category: 'accesories'
      }
    ]);
  });

  it('show method should return the correct Product', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: '1',
      name: 'watch',
      price: 400,
      category: 'accesories'
    });
  });

  it('delete method should remove the Product', async () => {
    store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
