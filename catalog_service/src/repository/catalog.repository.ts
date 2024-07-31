import { ICatalogRepository } from '../interface/catalogRepository.interface';
import { Product } from '../models/product.model';

export class CatalogRepository implements ICatalogRepository {
  constructor() {

  }
  create(data: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  find(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  delete(id: string) {
    throw new Error('Method not implemented.');
  }


}