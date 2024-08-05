import { cartRepositoryType } from '../types/repository.types';

const createCart = (input: any): Promise<{}> => {
  // conect to db
  // perform db operation
  return Promise.resolve({ message: 'fake response from cart repository', input });
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