import { Product } from '../models/product.model'

export interface ICatalogRepository {
  create(data: Product): Promise<Product>
  update(id: string, data: Product): Promise<Product>
  find(limit: number, offset: number): Promise<Product[]>
  findOne(id: string): Promise<Product>
  delete(id: string): any
}