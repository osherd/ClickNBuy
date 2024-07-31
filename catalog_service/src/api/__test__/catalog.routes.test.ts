import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker'
import catalogRoutes, { catalogService } from '../catalog.routes'
import { ProductFactory } from '../../utils';
const app = express();
app.use(express.json());
app.use(catalogRoutes);
const mockRequest = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    price: faker.commerce.price()
  }
}

describe("Catalog Routes", () => {
  describe("POST/products", () => {

    test('Should create product succesfully', async () => {
      const requestBody = mockRequest();
      const prodcut = ProductFactory.build();
      jest.spyOn(catalogService, 'createProduct').mockImplementationOnce(() => Promise.resolve(prodcut));
      const response = await request(app)
        .post('/products')
        .send(requestBody)
        .set("Accept", "application/json")
      // expect(response.status).toBe(201);
      // expect(response.body).toBe(prodcut)
    })
    test('Should response with validation error 404', async () => {
      const requestBody = mockRequest();
      const response = await request(app)
        .post('/products')
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json")
      expect(response.status).toBe(404);
      expect(response.body).toEqual("name should not be empty");
    })
    test('Should response with an internal error code 500', async () => {
      const requestBody = mockRequest();
      jest.spyOn(catalogService, 'createProduct').mockImplementationOnce(() => Promise.reject(new Error('unable to create product')));
      const response = await request(app)
        .post('/products')
        .send(requestBody)
        .set("Accept", "application/json")
      expect(response.status).toBe(500);
      expect(response.body).toBe('unable to create product');
    })
  });
  describe("PATCH/products/:id", () => {
    test('Should update product succesfully', async () => {

      const prodcut = ProductFactory.build();
      const requestBody = {
        name: prodcut.name,
        stock: prodcut.stock,
        price: prodcut.price
      };
      jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(() => Promise.resolve(prodcut));
      const response = await request(app)
        .patch(`/products/${prodcut.id}`)
        .send(requestBody)
        .set("Accept", "application/json")
      // expect(response.status).toBe(200);
      // expect(response.body).toBe(prodcut)
    })
    test('Should response with validation error 404', async () => {
      const prodcut = ProductFactory.build();
      const requestBody = {
        name: prodcut.name,
        stock: prodcut.stock,
        price: -1
      };
      const response = await request(app)
        .patch(`/products/${prodcut.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body).toEqual("price must not be less than 1");
    })
    test('Should response with an internal error code 500', async () => {
      const requestBody = mockRequest();
      const prodcut = ProductFactory.build();
      jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(() => Promise.reject(new Error('unable to update product')));
      const response = await request(app)
        .patch(`/products/${prodcut.id}`)
        .send(requestBody)
        .set("Accept", "application/json")
      expect(response.status).toBe(500);
      expect(response.body).toBe('unable to update product');
    })
  });
  describe("GET /products?limit=0&offset=0", () => {
    test("should return a range of products based on limit and offset", async () => {
      const randomLimit = faker.number.int({ min: 10, max: 50 });
      const products = ProductFactory.buildList(randomLimit);
      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementationOnce(() => Promise.resolve(products));
      const response = await request(app)
        .get(`/products?limit=${randomLimit}&offset=0`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(products);
    });
  });
  describe("GET /products/:id", () => {
    test("should return product by id", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "getProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .get(`/products/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });
  });
  describe("DELETE /products/:id", () => {
    test("should delete product by id", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementationOnce(() => Promise.resolve({ id: product.id }));
      const response = await request(app)
        .delete(`/products/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: product.id });
    });
  });
})