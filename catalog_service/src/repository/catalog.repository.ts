import { PrismaClient } from '@prisma/client';
import { ICatalogRepository } from '../interface/catalogRepository.interface';
import { Product } from '../models/product.model';

export class CatalogRepository implements ICatalogRepository {

  prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient();

  }
  async create(data: Product): Promise<Product> {
    return this.prisma.product.create({ data })
  }
  async update(data: Product): Promise<Product> {
    return this.prisma.product.update({
      where: { id: data.id },
      data: data
    })
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      take: limit,
      skip: offset
    })
  }
  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: { id }
    })
    if (!product) {
      throw new Error('Product not found')
    }
    return product;
  }
  async delete(id: string) {
    return this.prisma.product.delete({
      where: {
        id: id
      }
    })
  }


}