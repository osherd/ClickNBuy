import { ICatalogRepository } from '../interface/catalogRepository.interface';
import { Product } from '../models/product.model';

export class CatalogService {
  private repository: ICatalogRepository
  constructor(repository: ICatalogRepository) {
    this.repository = repository;
  }
  async createProduct(inputData: Product) {
    const data = await this.repository.create(inputData);
    if (!data.id) {
      throw new Error('unable to create product')
    }
    return data;
  }
  async updateProduct(inputData: any) {
    // emit event to update record in Elastic search
    const data = await this.repository.update(inputData);
    if (!data.id) {
      throw new Error('unable to update product')
    }
    return data;
  }
  // We will get products from Elastic search
  async getProducts(limit: number, offset: number) {
    return this.repository.find(limit, offset);
  }
  async getProduct(id: number) {
    return this.repository.findOne(id)
  }
  // delete from Elastic search
  async deleteProduct(id: number) {
    return this.repository.delete(id);
  }
}