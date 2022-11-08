import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import client from './database';

dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Server'
  });
});

client
  .connect()
  .then((y) => console.log({ y }))
  .catch((err) => console.log({ err }));
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
