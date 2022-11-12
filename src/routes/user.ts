import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserEntity, USER } from '../models/user';

const router: Router = express.Router();

const store = new UserEntity();

router.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
    // res.send('this is the INDEX route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/users/:id', async (_req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(_req.params.id, 10));
    if (user) res.json(user);
    else res.status(404).json('user not found');
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

router.post('/users', async (req: Request, res: Response) => {
  try {
    const user: USER = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };

    await store
      .create(user)
      .then((_res) => {
        var token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);

        res.json({
          statusCode: 200,
          message: 'user has been succesfully created.',
          data: user,
          token
        });
      })
      .catch(() => {
        res.json({
          statusCode: 400,
          message: 'error has happened in creating user.'
        });
      });
  } catch (err) {
    res.json({
      statusCode: 400,
      message: 'error has happened.',
      data: err
    });
  }
});

router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const user: USER = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    await store
      .update(user, parseInt(req.params.id, 10))
      .then(() => {
        res.json({
          statusCode: 200,
          message: 'user has been succesfully updated.',
          data: user
        });
      })
      .catch((e) => {
        console.log(e);

        res.json({
          statusCode: 400,
          message: 'error has happened in updating user.'
        });
      });
  } catch (err) {
    console.log({ err });

    res.status(400);
    res.json(err);
  }
});

router.delete('/users/:id', async (_req: Request, res: Response) => {
  try {
    await store
      .delete(parseInt(_req.params.id, 10))
      .then(() => {
        res.json({
          statusCode: 200,
          message: 'user has been succesfully deleted.'
        });
      })
      .catch(() => {
        res.json({
          statusCode: 400,
          message: 'error has happened in deleting user.'
        });
      });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.post('/users/authenticate', async (_req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = _req.body;

  try {
    const loggedInUser = await store.authenticate(email, password);
    const token = jwt.sign({ loggedInUser }, process.env.TOKEN_SECRET as unknown as string);
    if (!loggedInUser) {
      res.status(401).json({
        status: 'error',
        message: 'email or password or both are not exist.'
      });
    } else {
      res.status(200).json({
        status: 'successful login',
        data: { token, user: loggedInUser }
      });
    }
  } catch (err) {
    res.status(401);
    if (err) res.json(err + 'user');
  }
});

export default router;
