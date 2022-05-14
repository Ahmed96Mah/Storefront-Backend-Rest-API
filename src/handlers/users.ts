import express, { Request, Response } from 'express';
import { User, userStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../util/authToken';

const store = new userStore();
const { secret } = process.env;

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const user = await store.show(id);
    if (user !== null) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ Message: 'Invalid User Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const userItem: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(userItem);
    const token = jwt.sign({ newUser }, secret as string);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const edit = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const userItem: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const editedUser = await store.edit(id, userItem);
    if (editedUser !== null) {
      res.status(200).json(editedUser);
    } else {
      res.status(400).json({ Message: 'Invalid User Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const deletedUser = await store.delete(id);
    if (deletedUser !== null) {
      res.status(200).json(deletedUser);
    } else {
      res.status(400).json({ Message: 'Invalid User Id!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const password = req.body.password;
  try {
    const authUser = await store.authenticate(id, password);
    if (authUser !== null) {
      const token = jwt.sign({ authUser }, secret as string);
      res.status(200).json(token);
    } else {
      res.status(400).json({ Message: 'Invalid User Id or Password!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};

export const userRoutes = (app: express.Application): void => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.get('/users/auth/:id', verifyAuthToken, authenticate);
  app.post('/users/add', verifyAuthToken, create);
  app.put('/users/edit/:id', verifyAuthToken, edit);
  app.delete('/users/delete/:id', verifyAuthToken, deleteUser);
};
