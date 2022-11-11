import express, { Router, Request, Response } from 'express';
import { USER } from '../models//user';

const router: Router = express.Router();

router.get('/users', (_req: Request, res: Response) => {
  try {
    res.send('this is the INDEX route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/users/:id', (_req: Request, res: Response) => {
  try {
    res.send('this is the SHOW route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.post('/users', (req: Request, res: Response) => {
  console.log(req.body);
  try {
    res.send('this is the CREATE route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.put('/users/:id', (req: Request, res: Response) => {
  const user: USER = {
    id: parseInt(req.params.id, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  try {
    res.send('this is the EDIT route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.delete('/users/:id', (_req: Request, res: Response) => {
  try {
    res.send('this is the DELETE route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default router;
