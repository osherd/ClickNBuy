import express, { Request, Response, NextFunction } from 'express'
import * as service from '../services/cart.service'
import * as repository from '../repository/cart.repository';
const router = express.Router();
const repo = repository.CartRepository;

router.post("/cart", async (req: Request, res: Response, next: NextFunction) => {

  const response = await service.CreateCart(req.body, repo)
  return res.status(200).json(response)
});
router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {

  const response = await service.GetCart(req.params.id, repo)
  return res.status(200).json(response)
});

router.patch("/cart/:id", async (req: Request, res: Response, next: NextFunction) => {
  const response = await service.EditeCart(req.body, repo)
  return res.status(200).json(response)
});
router.delete("/cart/:id", async (req: Request, res: Response, next: NextFunction) => {
  const response = await service.DeleteCart(req.body, repo)
  return res.status(200).json(response)
});

export default router;