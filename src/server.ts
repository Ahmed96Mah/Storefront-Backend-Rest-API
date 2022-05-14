import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import { userRoutes } from './handlers/users';
import dashboardRoutes from './handlers/dashboards';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';
const corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

productRoutes(app);
orderRoutes(app);
userRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
