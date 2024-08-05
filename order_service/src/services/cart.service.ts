import { cartRepositoryType } from '../types/repository.types';

export const CreateCart = (input: any, repo: cartRepositoryType) => {
  return repo.create(input);

}

export const EditeCart = (input: any, repo: cartRepositoryType) => {
  return repo.update(input)

}
export const GetCart = (id: string, repo: cartRepositoryType) => {
  return repo.find(id);
}

export const DeleteCart = (id: string, repo: cartRepositoryType) => {
  return repo.delete(id);

}