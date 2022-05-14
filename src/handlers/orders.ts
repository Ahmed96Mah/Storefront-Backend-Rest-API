import express, { Request, Response } from 'express';
import { Order, Ordered, orderStore } from '../models/order';
import { verifyAuthToken } from '../util/authToken';

const store = new orderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const order = await store.show(id);
    if (order !== null) {
      res.status(200).json(order);
    } else {
      res.status(400).json({ Message: 'Invalid Order Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const orderItem: Order = {
    user_id: req.body.user_id,
    status: req.body.status,
  };
  try {
    const newOrder = await store.create(orderItem);
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const edit = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const orderItem: Order = {
    user_id: req.body.user_id,
    status: req.body.status,
  };
  try {
    const editedOrder = await store.edit(id, orderItem);
    if (editedOrder !== null) {
      res.status(200).json(editedOrder);
    } else {
      res.status(400).json({ Message: 'Invalid Order Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const deletedOrder = await store.delete(id);
    if (deletedOrder !== null) {
      res.status(200).json(deletedOrder);
    } else {
      res.status(400).json({ Message: 'Invalid Order Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const orderProduct = async (req: Request, res: Response): Promise<void> => {
  const orderedItem: Ordered = {
    order_id: req.body.order_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  };
  try {
    const orderDetails = await store.orderProduct(orderedItem);
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const checkout = async (req: Request, res: Response): Promise<void> => {
  const orderID = req.params.id;
  try {
    const checkOrders = await store.checkout(orderID);
    if (checkOrders !== null) {
      res.status(200).json({ Message: 'The products table has been updated!' });
    } else {
      res.status(400).json({ Message: 'Invalid Order Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const orderRoutes = (app: express.Application): void => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders/add', verifyAuthToken, create);
  app.post('/orders/add/product', verifyAuthToken, orderProduct);
  app.put('/orders/edit/:id', verifyAuthToken, edit);
  app.put('/orders/checkout/:id', verifyAuthToken, checkout);
  app.delete('/orders/delete/:id', verifyAuthToken, deleteOrder);
};

export default orderRoutes;
