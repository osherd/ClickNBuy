// import { cartRepositoryType, orderRepositoryType } from '../types/repository.types';

const createOrder = (input: any): Promise<{}> => {
  // conect to db
  // perform db operation
  return Promise.resolve({});
}
const findOrder = (input: any): Promise<{}> => {
  return Promise.resolve({});
}
const updateOrder = (input: any): Promise<{}> => {
  return Promise.resolve({});
}
const deleteOrder = (id: string): Promise<{}> => {
  return Promise.resolve({});
}

export const OrderRepository: any = {
  create: createOrder,
  find: findOrder,
  update: updateOrder,
  delete: deleteOrder
}