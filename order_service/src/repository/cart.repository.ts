import { DB } from '../db/db.connection';
import { carts } from '../db/schema';
import { cartRepositoryType } from '../types/repository.types';

const createCart = async (input: any): Promise<{}> => {
  // conect to db
  const result = await DB.insert(carts).values({
    customerId: 124
  }).returning({ cartId: carts.id });
  // perform db operation
  return Promise.resolve({ message: 'fake response from cart repository', input, result });

}
const findCart = (input: any): Promise<{}> => {
  return Promise.resolve({});
}
const updateCart = (input: any): Promise<{}> => {
  return Promise.resolve({});
}
const deleteCart = (id: string): Promise<{}> => {
  return Promise.resolve({});
}

export const CartRepository: cartRepositoryType = {
  create: createCart,
  find: findCart,
  update: updateCart,
  delete: deleteCart
}