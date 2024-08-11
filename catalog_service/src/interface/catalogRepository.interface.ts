import { Product } from '../models/product.model'

export interface ICatalogRepository {
  create(data: Product): Promise<Product>
  update(data: Product): Promise<Product>
  find(limit: number, offset: number): Promise<Product[]>
  findOne(id: number): Promise<Product>
  delete(id: number): any
}