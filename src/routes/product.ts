import express, { Router, Request, Response } from 'express';
import { verifyAuthToken } from '../helpers';
import { ProductEntity, Product } from '../models/product';

const router: Router = express.Router();

const store = new ProductEntity();

router.get('/products', verifyAuthToken, async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

router.get('/products/:pid', verifyAuthToken, async (_req: Request, res: Response) => {
  try {
    const Product = await store.show(parseInt(_req.params.pid, 10));
    if (Product) res.json(Product);
    else res.status(404).json('Product not found');
  } catch (err) {
    res.status(404);
    res.json(err);
  }
});

router.post('/products', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const Product: Product = {
      p_name: req.body.name,
      price: req.body.price,
      category: req.body?.category
    };

    await store
      .create(Product)
      .then((_res) => {
        res.json({
          statusCode: 200,
          message: 'Product has been succesfully created.',
          data: Product
        });
      })
      .catch((e) => {
        console.log(e);

        res.json({
          statusCode: 400,
          message: 'error has happened in creating Product.'
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

router.put('/products/:pid', verifyAuthToken, async (req: Request, res: Response) => {
  try {
    const Product: Product = {
      p_name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    await store
      .update(Product, parseInt(req.params.pid, 10))
      .then(() => {
        res.json({
          statusCode: 200,
          message: 'Product has been succesfully updated.',
          data: Product
        });
      })
      .catch((e) => {
        console.log(e);

        res.json({
          statusCode: 400,
          message: 'error has happened in updating Product.'
        });
      });
  } catch (err) {
    console.log({ err });

    res.status(400);
    res.json(err);
  }
});

router.delete('/products/:pid', verifyAuthToken, async (_req: Request, res: Response) => {
  try {
    await store
      .delete(parseInt(_req.params.pid, 10))
      .then(() => {
        res.json({
          statusCode: 200,
          message: 'Product has been succesfully deleted.'
        });
      })
      .catch(() => {
        res.json({
          statusCode: 400,
          message: 'error has happened in deleting Product.'
        });
      });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default router;
