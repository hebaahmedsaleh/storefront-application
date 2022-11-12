// @ts-ignore
import Client from '../database';

export type USER = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  id?: number;
};

export class UserEntity {
  async index(): Promise<USER[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT id, email, firstName, lastName FROM users';

      const result = await connection.query(sql);

      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<USER> {
    try {
      const sql = 'SELECT id, email, firstName, lastName FROM users WHERE id=($1)';

      const connection = await Client.connect();

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find USER ${id}. Error: ${err}`);
    }
  }

  async create(user: USER): Promise<USER> {
    try {
      const sql =
        'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, email';

      const connection = await Client.connect();

      const result = await connection.query(sql, [
        user.firstName,
        user.lastName,
        user.email,
        user.password
      ]);

      const userResult = result.rows[0];

      connection.release();

      return userResult;
    } catch (err) {
      throw new Error(`Could not add new USER ${user.firstName}. Error: ${err}`);
    }
  }

  async update(user: USER, id: number): Promise<USER> {
    try {
      const sql = `UPDATE users SET firstName = $1, lastName = $2, email = $3 WHERE id = ${id} RETURNING id, firstName, lastName, email`;

      const connection = await Client.connect();

      const result = await connection.query(sql, [user.firstName, user.lastName, user.email]);

      const userResult = result.rows[0];

      connection.release();

      return userResult;
    } catch (err) {
      throw new Error(`Could not add new USER ${user.firstName}. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<USER> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const connection = await Client.connect();

      const result = await connection.query(sql, [id]);

      const USER = result.rows[0];

      connection.release();

      return USER;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
