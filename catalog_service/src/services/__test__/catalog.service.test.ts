import { ICatalogRepository } from '../../interface/catalogRepository.interface';
import { Product } from '../../models/product.model';
import { MockCatalogRepository } from '../../repository/mockCatalog.repository';
import { ProductFactory } from '../../utils';
import { CatalogService } from '../catalog.service';
import { faker } from '@faker-js/faker'

const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest
  }
}
describe("CatalogService", () => {
  let repository: ICatalogRepository
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });
  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });
  describe("createProduct", () => {
    test('Should create product', async () => {
      const service = new CatalogService(repository);
      const result = await service.createProduct(mockProduct({ price: +faker.commerce.price() }));

      expect(result).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      })

    })
    test('Should throw error with message unable to create product', async () => {

      const service = new CatalogService(repository);
      jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.resolve({} as Product)
      )
      await expect(service.createProduct(mockProduct({ price: +faker.commerce.price() }))).rejects.toThrow(
        'unable to create product'
      )
    })
    test('Should throw error with message product already exist', async () => {

      const service = new CatalogService(repository);
      jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.reject(new Error('product already exist')))
      await expect(service.createProduct(mockProduct({ price: +faker.commerce.price() }))).rejects.toThrow(
        'product already exist'
      )
    })
  })
  describe("UpdateProduct", () => {
    test("Should update product", async () => {
      const reqBody = mockProduct({ id: faker.number.int({ min: 10, max: 100 }), price: +faker.commerce.price() })
      const service = new CatalogService(repository);
      const result = await service.updateProduct(reqBody);
      expect(result).toMatchObject(reqBody);
    })
    test('Should throw error with message product does not exist', async () => {

      const service = new CatalogService(repository);
      jest.spyOn(repository, 'update').mockImplementationOnce(() => Promise.reject(new Error('product does not exist')))
      await expect(service.updateProduct({})).rejects.toThrow(
        'product does not exist'
      )
    })
  })

  describe('getAllProducts', () => {
    test('Should get all prodcuts by limit and offset', async () => {

      const service = new CatalogService(repository);
      const randomLimit = faker.number.int({ min: 10, max: 60 });
      const prodcuts = ProductFactory.buildList(randomLimit)
      jest.spyOn(repository, 'find').mockImplementationOnce(() => Promise.resolve(prodcuts))
      const result = await service.getProducts(randomLimit, 0)

      expect(result.length).toEqual(randomLimit);
      expect(result).toMatchObject(prodcuts)
    })
    test('Should throw error with message products not exist', async () => {

      const service = new CatalogService(repository);
      jest.spyOn(repository, 'find').mockImplementationOnce(() => Promise.reject(new Error('products not exist')))
      await expect(service.getProducts(0, 0)).rejects.toThrow(
        'products not exist'
      )
    })
  })
  describe('getProduct', () => {
    test('Should get prodcut by id', async () => {

      const service = new CatalogService(repository);
      const prodcut = ProductFactory.build();
      jest.spyOn(repository, 'findOne').mockImplementationOnce(() => Promise.resolve(prodcut))
      const result = await service.getProduct(prodcut.id!)

      expect(result).toMatchObject(prodcut)
    })
  })
  describe('deleteProduct', () => {
    test('Should delete prodcut by id', async () => {

      const service = new CatalogService(repository);
      const prodcut = ProductFactory.build();
      jest.spyOn(repository, 'delete').mockImplementationOnce(() => Promise.resolve({ id: prodcut.id }))
      const result = await service.deleteProduct(prodcut.id!)

      expect(result).toMatchObject({
        id: prodcut.id
      })
    })
  })
})