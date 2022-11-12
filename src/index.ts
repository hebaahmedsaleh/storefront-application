import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

import userRoutes from './routes/user';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();
const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(morgan('short'));

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Server'
  });
});

app.use(urlencodedParser);
app.use(jsonParser);

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
