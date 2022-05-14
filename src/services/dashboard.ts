import Client from '../database';
import { Product } from '../models/product';
import { Order } from '../models/order';

export class dashboardStore {
  async showByCateg(category: string): Promise<Product[] | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category=($1)';
      const products = await conn.query(sql, [category]);
      if (products.rows.length) {
        conn.release();
        return products.rows;
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async orderByUser(id: string, status: string): Promise<Order[] | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE (user_id, status) = ($1, $2)';
      const orders = await conn.query(sql, [id, status]);
      if (orders.rows.length) {
        conn.release();
        return orders.rows;
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async top5Products(): Promise<
    | {
        id: number;
        name: string;
        price: number;
        category: string;
        sold: number;
      }[]
    | null
  > {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products ORDER BY sold DESC LIMIT 5';
      const products = await conn.query(sql);
      if (products.rows[0].sold !== 0) {
        conn.release();
        return products.rows;
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
