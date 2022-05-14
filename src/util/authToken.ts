import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const { secret } = process.env;

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization as string;
  let token: string | undefined;

  if (authHeader !== undefined) {
    token = authHeader.split(' ')[1];
  } else {
    token = undefined;
  }

  try {
    if (token !== undefined && jwt.verify(token, secret as string)) {
      next();
    } else {
      res.status(400).json({ Message: 'Token Authentication Failed!!' });
    }
  } catch (err) {
    res.status(400).json({ Message: `${err}` });
  }
};
