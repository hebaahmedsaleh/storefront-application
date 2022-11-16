import { UserEntity } from '../../models/user';

const store = new UserEntity();

describe('User Model', () => {
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
  it('create method should add a user', async () => {
    const result = await store.create({
      firstName: 'laila',
      lastName: 'islam',
      email: 'laila.islam@gmail.com',
      password: '123_test'
    });

    expect(result).toEqual({
      firstName: 'laila',
      lastName: 'islam',
      email: 'laila.islam@gmail.com'
    });
  });

  it('index method should return a list of Users', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        firstName: 'laila',
        lastName: 'islam',
        email: 'laila.islam@gmail.com'
      }
    ]);
  });

  it('show method should return the correct User', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      firstName: 'laila',
      lastName: 'islam',
      email: 'laila.islam@gmail.com'
    });
  });

  it('delete method should remove the Product', async () => {
    store.delete(1);
    const result = await store.show(1);

    expect(result).not.toBeDefined();
  });
});
