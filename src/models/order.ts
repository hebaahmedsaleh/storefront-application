'use strict';
import Client from '../database';

export type Order = {
  id?: number;
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

      const conn = await Client.connect();
      const result = await conn.query(sql, [b.order_status, b.quantity, b.product_id, b.user_id]);
      const Order = result.rows[0];
      conn.release();
      return Order;
    } catch (err) {
      throw new Error(`Could not add new Order Error: ${err}`);
    }
  }

  async update(order: Order, id: number): Promise<Order> {
    try {
      const sql = `UPDATE orders SET order_status = $1, quantity = $2, product_id = $3, user_id= $4 WHERE id = ${id} RETURNING pid, p_name, price, category`;

      const connection = await Client.connect();

      const result = await connection.query(sql, [
        order.order_status,
        order.quantity,
        order.product_id,
        order.user_id
      ]);

      const order_res = result.rows[0];

      connection.release();

      return order_res;
    } catch (err) {
      throw new Error(`Could not add new prod ${order.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM Orders WHERE id=($1)';
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
