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
  })
  test('Should response with an internal error code 500', async () => {
    const requestBody = mockRequest();
    jest.spyOn(catalogService, 'createProduct').mockImplementationOnce(() => Promise.reject(new Error('error occurred on create product')));
    const response = await request(app)
      .post('/products')
      .send(requestBody)
      .set("Accept", "application/json")
    expect(response.status).toBe(500);
    expect(response.body).toBe('error occurred on create product');
  })
})