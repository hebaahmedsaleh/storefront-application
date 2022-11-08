'use strict';
import Client from '../database';

export type Order = {
  id: number;
  order_status: string;
  quantity: number;
  product_id: number;
  user_id: number;
};
export class OrderEntity {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM Orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Orders. Error: ${err}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM Orders WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Order ${id}. Error: ${err}`);
    }
  }
  async create(b: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO Orders (order_status, quantity, product_id, user_id) VALUES($1, $2, $3, $4) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [b.order_status, b.quantity, b.product_id, b.user_id]);
      const Order = result.rows[0];
      conn.release();
      return Order;
    } catch (err) {
      throw new Error(`Could not add new Order Error: ${err}`);
    }
  }
  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM Orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const Order = result.rows[0];
      conn.release();
      return Order;
    } catch (err) {
      throw new Error(`Could not delete Order ${id}. Error: ${err}`);
    }
  }
}
