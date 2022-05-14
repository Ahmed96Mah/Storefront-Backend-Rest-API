import Client from '../database';
import bcrypt from 'bcrypt';

const { pepper, saltRounds } = process.env;

type fiveProducts = {
  name: string;
  price: number;
};

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class userStore {
  async create(item: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(
        item.password + pepper,
        parseInt(saltRounds as string)
      );
      const newUser = await conn.query(sql, [
        item.firstName,
        item.lastName,
        hash,
      ]);
      conn.release();
      return newUser.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const allUsers = await conn.query(sql);
      conn.release();
      return allUsers.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async show(
    id: number
  ): Promise<{ info: User; products: fiveProducts[] } | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const user = await conn.query(sql, [id]);
      if (user.rows.length) {
        const getProductsSQL = `SELECT name, price FROM orders INNER JOIN order_products ON orders.id = 
                order_products.order_id INNER JOIN products ON order_products.product_id = 
                products.id WHERE (orders.status, user_id) = ('complete', $1) ORDER BY
                orders.id DESC LIMIT 5`;
        const last5Products = await conn.query(getProductsSQL, [id]);
        if (last5Products !== null) {
          conn.release();
          return { info: user.rows[0], products: last5Products.rows };
        } else {
          conn.release();
          return null;
        }
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async edit(id: number, item: User): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const checkSQL = 'SELECT firstName FROM users WHERE id=($1)';
      const checkResult = await conn.query(checkSQL, [id]);
      if (checkResult.rows.length) {
        const sql =
          'UPDATE users SET (firstName, lastName, password) = ($1, $2, $3) WHERE id=($4) RETURNING *';
        const hash = bcrypt.hashSync(
          item.password + pepper,
          parseInt(saltRounds as string)
        );
        const editedUser = await conn.query(sql, [
          item.firstName,
          item.lastName,
          hash,
          id,
        ]);
        conn.release();
        return editedUser.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const checkSQL = 'SELECT firstName FROM users WHERE id=($1)';
      const checkResult = await conn.query(checkSQL, [id]);
      if (checkResult.rows.length) {
        const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
        const deletedUser = await conn.query(sql, [id]);
        conn.release();
        return deletedUser.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async authenticate(id: number, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT password FROM users WHERE id=($1)';
      const hashedPass = await conn.query(sql, [id]);
      if (hashedPass.rows.length) {
        if (
          bcrypt.compareSync(password + pepper, hashedPass.rows[0].password)
        ) {
          const retrieveSQL = 'SELECT * FROM users WHERE id=($1)';
          const retrievedData = await conn.query(retrieveSQL, [id]);
          conn.release();
          return retrievedData.rows[0];
        } else {
          conn.release();
          return null;
        }
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
