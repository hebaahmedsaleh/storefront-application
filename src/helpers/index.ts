import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
const handleUnAuthorized = (next: NextFunction) => {
  const err = new Error('you arent logged in');
  err.name = 'authentication error';
  next(err);
};
export const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    try {
      const decoded = token && jwt.verify(token, process.env.TOKEN_SECRET as string);
      console.log('heba', token, process.env.TOKEN_SECRET, decoded);

      if (decoded) {
        next();
      } else {
        handleUnAuthorized(next);
      }
    } catch (e) {
      console.log(e);
    }
  } catch (error) {
    res.status(401);
  }
};
