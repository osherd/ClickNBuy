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
    return this.repository.update(inputData)
  }
  // We will get products from Elastic search
  async getProducts(limit: number, offset: number) {
    return this.repository.find(limit, offset);
  }
  async getProduct(id: string) {
    return this.repository.findOne(id)
  }
  // delete from Elastic search
  async deleteProduct(id: string) {
    return this.repository.delete(id);
  }
}