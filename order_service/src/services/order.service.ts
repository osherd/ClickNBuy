import { orderRepositoryType } from '../types/repository.types'

export const CreateOrder = (input: any, repo: orderRepositoryType) => {
  return repo.create(input)

}

export const EditOrder = (input: any, repo: orderRepositoryType) => {
  return repo.update(input)

}

export const GetOrderById = (id: string, repo: orderRepositoryType) => {
  return repo.find(id);

}
export const DeleteOrder = (id: string, repo: orderRepositoryType) => {
  return repo.delete(id);
}