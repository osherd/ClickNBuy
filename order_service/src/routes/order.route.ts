import express, { Request, Response, NextFunction } from 'express';
import * as service from '../services/order.service'
import * as repository from '../repository/order.repository';
const router = express.Router();

const repo = repository.OrderRepository;
router.post("/order", async (req: Request, res: Response, next: NextFunction) => {
  const response = await service.CreateOrder(req.body, repo);
  return res.status(200).json(response)
});
router.get("/order", async (req: Request, res: Response, next: NextFunction) => {

  const response = await service.GetOrderById(req.params.id, repo);
  return res.status(200).json(response)
});
router.patch("/order:id", async (req: Request, res: Response, next: NextFunction) => {

  const response = await service.EditOrder(req.params.id, repo);
  return res.status(200).json(response)
});

router.delete("/order/:id", async (req: Request, res: Response, next: NextFunction) => {

  const response = await service.DeleteOrder(req.params.id, repo);
  return res.status(200).json(response)
});

export default router;