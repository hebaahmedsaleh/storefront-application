import express, { Router, Request, Response } from 'express';
import { verifyAuthToken } from '../helpers';
import { OrderEntity } from '../models/order';
import { Order } from '../types';

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
        console.log({ _res });

        // if(product_id) {
        //   await store.addProductToOrder()

        // }
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

router.post('/orders/add', async (req: express.Request, res: express.Response) => {
  try {
    const order_id = parseInt(req.params.id);
    const product_id = parseInt(req.body.product_id as string);
    const quantity = parseInt(req.body.quantity as string);

    if (!order_id || !quantity || !product_id) {
      return res.status(400).json({
        error: 'missing required parameters'
      });
    }

    const product = await store.addProductToOrder({
      order_id,
      product_id,
      quantity
    });

    res.status(200).json(product);
  } catch (e) {
    res.json({ json: e });
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
