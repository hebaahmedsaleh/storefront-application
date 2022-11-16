import Client from '../database';
import { Product } from '../types';

export class ProductEntity {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(pid: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE pid=($1)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [pid]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${pid}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (p_name, price, category) VALUES($1, $2, $3) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [product.p_name, product.price, product.category]);

      const productResult = result.rows[0];

      conn.release();

      return productResult;
    } catch (err) {
      throw new Error(`Could not add new product ${product.p_name}. Error: ${err}`);
    }
  }

  async update(product: Product, pid: number): Promise<Product> {
    try {
      const sql = `UPDATE products SET p_name = $1, price = $2, category = $3 WHERE pid = ${pid} RETURNING pid, p_name, price, category`;

      const connection = await Client.connect();

      const result = await connection.query(sql, [
        product.p_name,
        product.price,
        product?.category
      ]);

      const userResult = result.rows[0];

      connection.release();

      return userResult;
    } catch (err) {
      throw new Error(`Could not add new prod ${product.p_name}. Error: ${err}`);
    }
  }

  async delete(pid: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE pid=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [pid]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${pid}. Error: ${err}`);
    }
  }
}
