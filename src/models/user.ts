import bcrypt from 'bcrypt';

import Client from '../database';
import { User } from '../types';

export class UserEntity {
  async index(): Promise<User[]> {
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

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT id, email, firstName, lastName FROM users WHERE id=($1)';

      const connection = await Client.connect();

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
      const sql =
        'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, email';

      const connection = await Client.connect();

      const hash =
        BCRYPT_PASSWORD &&
        SALT_ROUNDS &&
        user.password &&
        bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));

      const result = await connection.query(sql, [user.firstName, user.lastName, user.email, hash]);

      const userResult = result.rows[0];

      connection.release();

      return userResult;
    } catch (err) {
      throw new Error(`Could not add new User ${user.firstName}. Error: ${err}`);
    }
  }

  async update(user: User, id: number): Promise<User> {
    try {
      const sql = `UPDATE users SET firstName = $1, lastName = $2, email = $3 WHERE id = ${id} RETURNING id, firstName, lastName, email`;

      const connection = await Client.connect();

      const result = await connection.query(sql, [user.firstName, user.lastName, user.email]);

      const userResult = result.rows[0];

      connection.release();

      return userResult;
    } catch (err) {
      throw new Error(`Could not add new User ${user.firstName}. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const connection = await Client.connect();

      const result = await connection.query(sql, [id]);

      const User = result.rows[0];

      connection.release();

      return User;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(email: string, p: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT password FROM users WHERE email=($1)';

      const { BCRYPT_PASSWORD } = process.env;

      const result = await conn.query(sql, [email]);
      if (result.rows.length) {
        const { password } = result.rows[0];

        const isValid = bcrypt.compareSync(`${p}${BCRYPT_PASSWORD}`, password);

        if (isValid) {
          const sql = 'SELECT id, email, firstName, lastName FROM users WHERE email=($1)';
          const result = await conn.query(sql, [email]);

          return result.rows[0];
        }
      }

      return null;
    } catch (err) {
      console.log({ err });
      return null;
    }
  }
}
