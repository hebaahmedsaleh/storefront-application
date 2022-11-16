import Client from '../database';
import { Product } from '../types';

export class ProductEntity {
  async index(): Promise<Product[] | Error> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      const error = new Error(`Could not get product. Error: ${err}`);
      return error as unknown as Error;
    }
  }

  async show(pid: number): Promise<Product | Error> {
    try {
      const sql = 'SELECT * FROM products WHERE pid=($1)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [pid]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      const error = new Error(`Could not find product ${pid}. Error: ${err}`);
      return error as unknown as Error;
    }
  }

  async create(product: Product): Promise<Product | Error> {
    try {
      const sql = 'INSERT INTO products (p_name, price, category) VALUES($1, $2, $3) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [product.p_name, product.price, product.category]);

      const productResult = result.rows[0];

      conn.release();

      return productResult;
    } catch (err) {
      const error = new Error(`Could not add new product ${product.p_name}. Error: ${err}`);
      return error as unknown as Error;
    }
  }

  async update(product: Product, pid: number): Promise<Product | Error> {
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
      const error = new Error(`Could not add new prod ${product.p_name}. Error: ${err}`);
      return error as unknown as Error;
    }
  }

  async delete(pid: number): Promise<Product | Error> {
    try {
      const sql = 'DELETE FROM products WHERE pid=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [pid]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      const error = new Error(`Could not delete product ${pid}. Error: ${err}`);
      return error as unknown as Error;
    }
  }
}
