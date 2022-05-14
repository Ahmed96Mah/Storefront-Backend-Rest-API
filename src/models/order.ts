import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type Ordered = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class orderStore {
  async create(item: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
      const newOrder = await conn.query(sql, [item.user_id, item.status]);
      conn.release();
      return newOrder.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const allOrders = await conn.query(sql);
      conn.release();
      return allOrders.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const order = await conn.query(sql, [id]);
      if (order.rows.length) {
        conn.release();
        return order.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async edit(id: string, item: Order): Promise<Order | null> {
    try {
      const conn = await Client.connect();
      const checkSQL = 'SELECT status FROM orders WHERE id=($1)';
      const checkResult = await conn.query(checkSQL, [id]);
      if (checkResult.rows.length) {
        const sql =
          'UPDATE orders SET (user_id, status) = ($1, $2) WHERE id=($3) RETURNING *';
        const editedOrder = await conn.query(sql, [
          item.user_id,
          item.status,
          id,
        ]);
        conn.release();
        return editedOrder.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order | null> {
    try {
      const conn = await Client.connect();
      const checkSQL = 'SELECT status FROM orders WHERE id=($1)';
      const checkResult = await conn.query(checkSQL, [id]);
      if (checkResult.rows.length) {
        const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
        const deletedOrder = await conn.query(sql, [id]);
        conn.release();
        return deletedOrder.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async orderProduct(item: Ordered): Promise<Ordered> {
    try {
      const conn = await Client.connect();
      const checkSQL =
        'SELECT quantity, id FROM order_products WHERE (order_id, product_id) = ($1, $2)';
      const checkResult = await conn.query(checkSQL, [
        item.order_id,
        item.product_id,
      ]);
      if (checkResult.rows.length) {
        const id = checkResult.rows[0].id as number;
        const amount = checkResult.rows[0].quantity as number;
        const newAmount = amount + item.quantity;
        const updateSQL =
          'UPDATE order_products SET quantity=($1) WHERE id=($2) RETURNING *';
        const updatedOrder = await conn.query(updateSQL, [newAmount, id]);
        conn.release();
        return updatedOrder.rows[0];
      } else {
        const sql =
          'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
        const orderedProduct = await conn.query(sql, [
          item.order_id,
          item.product_id,
          item.quantity,
        ]);
        conn.release();
        return orderedProduct.rows[0];
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async checkout(id: string): Promise<void | null> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT sold, quantity, product_id FROM orders INNER JOIN order_products ON orders.id = 
            order_products.order_id INNER JOIN products ON order_products.product_id = products.id WHERE 
            order_id=($1)`;
      const orderedProduct = await conn.query(sql, [id]);
      if (orderedProduct.rows.length) {
        for (const product of orderedProduct.rows) {
          const amountSold = product.sold + product.quantity;
          const productID = product.product_id;
          const productSQL = 'UPDATE products SET sold=($1) WHERE id=($2)';
          conn.query(productSQL, [amountSold, productID]);
        }
        const statusSQL = 'UPDATE orders SET status=($1) WHERE id=($2)';
        conn.query(statusSQL, ['complete', id]);
        conn.release();
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
