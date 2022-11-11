// @ts-ignore
import Client from '../database';

export type USER = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class UserEntity {
  async index(): Promise<USER[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<USER> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find USER ${id}. Error: ${err}`);
    }
  }

  async create(user: USER): Promise<USER> {
    try {
      const sql =
        'INSERT INTO users (id, firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.email,
        user.password
      ]);

      const userResult = result.rows[0];

      conn.release();

      return userResult;
    } catch (err) {
      throw new Error(`Could not add new USER ${user.firstName}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<USER> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const USER = result.rows[0];

      conn.release();

      return USER;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
