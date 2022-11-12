import express, { Router, Request, Response } from 'express';
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
        res.json({
          statusCode: 200,
          message: 'user has been succesfully created.',
          data: user
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

export default router;
