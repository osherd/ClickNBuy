import express, { Request, Response, NextFunction } from 'express'
import * as service from '../services/cart.service'
import * as repository from '../repository/cart.repository';
import { ValidateRequest } from '../utils/validator';
import { CartCreateRequestInput, cartCreateRequestSchema } from '../dto/cartRequest.dto';
const router = express.Router();
const repo = repository.CartRepository;


const authMidlleware = async (req: Request, res: Response, next: NextFunction) => {

  // jwt
  const isValidate = true;
  if (!isValidate) {
    return res.status(403).json({ error: 'authorization error' })
  }
  return next();
}


router.post("/cart", authMidlleware, async (req: Request, res: Response, next: NextFunction) => {

  try {
    const err = ValidateRequest<CartCreateRequestInput>(req.body, cartCreateRequestSchema);
    if (err) {
      return res.status(404).json({ err });
    }
    const response = await service.CreateCart(req.body as CartCreateRequestInput, repo)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({ error });
  }
});
router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {

  // comes from our auth user using jwt
  const response = await service.GetCart(req.body.customerId, repo)
  return res.status(200).json(response)
});

router.patch("/cart/:lineItemId", async (req: Request, res: Response, next: NextFunction) => {

  const lineItemId = +req.params.id

  const response = await service.EditCart({
    id: lineItemId,
    quantity: req.body.quantity
  }, repo)
  return res.status(200).json(response)
});
router.delete("/cart/:lineItemId", async (req: Request, res: Response, next: NextFunction) => {

  const lineItemId = +req.params.id
  const response = await service.DeleteCart(lineItemId, repo)
  return res.status(200).json(response)
});

export default router;