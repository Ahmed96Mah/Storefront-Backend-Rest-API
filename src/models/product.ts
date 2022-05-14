import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  sold?: number;
};

export class productStore {
  async create(item: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products (name, price, category, sold) VALUES ($1, $2, $3, 0) RETURNING *';
      const newProduct = await conn.query(sql, [
        item.name,
        item.price,
        item.category,
      ]);
      conn.release();
      return newProduct.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const allProducts = await conn.query(sql);
      conn.release();
      return allProducts.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const product = await conn.query(sql, [id]);
      if (product.rows.length) {
        conn.release();
        return product.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async edit(id: string, item: Product): Promise<Product | null> {
    try {
      const conn = await Client.connect();
      const checkSQL = 'SELECT name FROM products WHERE id=($1)';
      const checkResult = await conn.query(checkSQL, [id]);
      if (checkResult.rows.length) {
        const sql =
          'UPDATE products SET (name, price, category) = ($1, $2, $3) WHERE id=($4) RETURNING *';
        const editedProduct = await conn.query(sql, [
          item.name,
          item.price,
          item.category,
          id,
        ]);
        conn.release();
        return editedProduct.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product | null> {
    try {
      const conn = await Client.connect();
      const checkSQL = 'SELECT name FROM products WHERE id=($1)';
      const checkResult = await conn.query(checkSQL, [id]);
      if (checkResult.rows.length) {
        const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
        const deletedProduct = await conn.query(sql, [id]);
        conn.release();
        return deletedProduct.rows[0];
      } else {
        conn.release();
        return null;
      }
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
