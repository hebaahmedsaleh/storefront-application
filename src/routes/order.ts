import express, { Router, Request, Response } from 'express';
import { verifyAuthToken } from '../helpers';
import { OrderEntity, Order } from '../models/order';

const router: Router = express.Router();

const store = new OrderEntity();

router.get('/orders', verifyAuthToken, async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/orders/:id', verifyAuthToken, async (_req: Request, res: Response) => {
  try {
    const Order = await store.show(_req.params.id);
    if (Order) res.json(Order);
    else res.status(404).json('Order not found');
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

router.post('/orders', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const { order_status, quantity, product_id, user_id } = req.body;
    const Order: Order = {
      order_status,
      quantity,
      product_id,
      user_id
    };

    await store
      .create(Order)
      .then((_res) => {
        res.json({
          statusCode: 200,
          message: 'Order has been succesfully created.',
          data: Order
        });
      })
      .catch((e) => {
        console.log(e);

        res.json({
          statusCode: 400,
          message: 'error has happened in creating Order.'
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

router.put('/orders/id', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const { order_status, quantity, product_id, user_id } = req.body;
    const Order: Order = {
      order_status,
      quantity,
      product_id,
      user_id
    };

    await store
      .update(Order, parseInt(req.params.id, 10))
      .then(() => {
        res.json({
          statusCode: 200,
          message: 'Order has been succesfully updated.',
          data: Order
        });
      })
      .catch((e) => {
        console.log(e);

        res.json({
          statusCode: 400,
          message: 'error has happened in updating Order.'
        });
      });
  } catch (err) {
    console.log({ err });

    res.status(400);
    res.json(err);
  }
});

router.delete('/orders/id', verifyAuthToken, async (_req: Request, res: Response) => {
  try {
    await store
      .delete(_req.params.id)
      .then(() => {
        res.json({
          statusCode: 200,
          message: 'Order has been succesfully deleted.'
        });
      })
      .catch(() => {
        res.json({
          statusCode: 400,
          message: 'error has happened in deleting Order.'
        });
      });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default router;
