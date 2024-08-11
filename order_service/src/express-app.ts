import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cartRoute from './routes/cart.route';
import orderRoute from './routes/order.route';
import { httpLogger, HandleErrorWithLogger } from './utils'


const app = express();
app.use(express.json());
app.use(cors());

// http logger

app.use(httpLogger);
app.use(cartRoute);
app.use(orderRoute)


// app.use("/", (req: Request, res: Response, next: NextFunction) => {

//   return res.status(201).json({ message: 'health is up!' });
// })

// Error handler
app.use(HandleErrorWithLogger);

export default app