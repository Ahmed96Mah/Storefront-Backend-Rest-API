import express, { Request, Response } from 'express';
import { dashboardStore } from '../services/dashboard';
import { verifyAuthToken } from '../util/authToken';

const store = new dashboardStore();

const showByCateg = async (req: Request, res: Response): Promise<void> => {
  const category = req.params.category;
  try {
    const productsByCateg = await store.showByCateg(category);
    if (productsByCateg !== null) {
      res.status(200).json(productsByCateg);
    } else {
      res.status(400).json({ Message: 'There is no such category!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const orderByUser = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const status = req.body.status;
  try {
    const orders = await store.orderByUser(id, status);
    if (orders !== null) {
      res.status(200).json(orders);
    } else {
      res.status(400).json({ Message: 'Invalid User-Id or Order Status!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const top5Products = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.top5Products();
    if (products !== null) {
      res.status(200).json(products);
    } else {
      res.status(400).json({ Message: 'No Purchases as of yet!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const dashboardRoutes = (app: express.Application): void => {
  app.get(
    '/dashboard/products/category/:category',
    verifyAuthToken,
    showByCateg
  );
  app.get('/dashboard/orders/users/:id', verifyAuthToken, orderByUser);
  app.get('/dashboard/products/top5', verifyAuthToken, top5Products);
};

export default dashboardRoutes;
