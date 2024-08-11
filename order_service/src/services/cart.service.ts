import { CartLineItem } from "../db/schema";
import { CartEditRequestInput, CartCreateRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { GetProductDetails } from "../utils/broker";
import { NotFoundError } from '../utils/error/errors';
import { logger } from '../utils/logger';

export const CreateCart = async (
  input: CartCreateRequestInput,
  repo: CartRepositoryType
) => {
  //  make a call to our catalog microservice
  // synchronize call
  const product = await GetProductDetails(input.productId);
  logger.info(product);
  if (product.stock < input.quantity) {
    throw new NotFoundError("product is out of stock");
  }
  return repo.createCart(input.customerId, {
    productId: product.id,
    price: product.price,
    quantity: input.quantity,
    itemName: product.name,
    variant: product.variant,
  } as any as CartLineItem);
};

export const GetCart = async (id: number, repo: CartRepositoryType) => {
  const data = await repo.findCart(id);
  if (!data) {
    throw new NotFoundError("cart not found");
  }

  return data;
};

export const EditCart = async (
  input: CartEditRequestInput,
  repo: CartRepositoryType
) => {
  return await repo.updateCart(input.id, input.quantity);
};

export const DeleteCart = async (id: number, repo: CartRepositoryType) => {
  return repo.deleteCart(id);
};