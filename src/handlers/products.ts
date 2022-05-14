import express, { Request, Response } from 'express';
import { Product, productStore } from '../models/product';
import { verifyAuthToken } from '../util/authToken';

const store = new productStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const product = await store.show(id);
    if (product !== null) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ Message: 'Invalid Product Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const productItem: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await store.create(productItem);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const edit = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const productItem: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const editedProduct = await store.edit(id, productItem);
    if (editedProduct !== null) {
      res.status(200).json(editedProduct);
    } else {
      res.status(400).json({ Message: 'Invalid Product Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const deletedProduct = await store.delete(id);
    if (deletedProduct !== null) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(400).json({ Message: 'Invalid Product Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const productRoutes = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products/add', verifyAuthToken, create);
  app.put('/products/edit/:id', verifyAuthToken, edit);
  app.delete('/products/delete/:id', verifyAuthToken, deleteProduct);
};

export default productRoutes;
