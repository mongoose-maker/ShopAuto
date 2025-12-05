import { default as request } from 'supertest';
import type { Express } from 'express';
import { createTestApp, closeTestApp } from '../../../__tests__/helpers/testApp.js';
import { clearTestDb } from '../../../__tests__/helpers/testDb.js';

describe('ManufacturerController - E2E Tests', () => {
  let app: Express;

  beforeAll(async () => {
    app = (await createTestApp()) as unknown as Express;
  });

  beforeEach(async () => {
    await clearTestDb();
  });

  afterAll(async () => {
    await closeTestApp();
  });

  describe('POST /api/manufacturers', () => {
    it('должен создать нового производителя', async () => {
      const manufacturerData = {
        name: 'E2E test Manufacturer',
      };

      const response = await request(app)
        .post('/api/manufacturers')
        .send(manufacturerData)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();
      expect(response.body.name).toBe('E2E test Manufacturer');
    });

    it('должен вернуть ошибку валидации при невалидных данных', async () => {
      const invalidManufacturerData = {
        name: 'A',
      };

      const response = await request(app)
        .post('/api/manufacturers')
        .send(invalidManufacturerData)
        .expect(400);

      expect(response.body).toBeDefined();
    });

    it('должен вернуть ошибку при отсутствии обязательных полей', async () => {
      const incompleteData = {};

      const response = await request(app)
        .post('/api/manufacturers')
        .send(incompleteData)
        .expect(400);

      expect(response.body).toBeDefined();
    });

    it('должен вернуть ошибку при пустой строке', async () => {
      const emptyManuf = {
        name: '',
      };

      const response = await request(app).post('/api/manufacturers').send(emptyManuf).expect(400);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /api/manufacturers', () => {
    it('должен получить всех производителей', async () => {
      const manufacturer1 = { name: 'Manufacturer 1' };
      const manufacturer2 = { name: 'Manufacturer 2' };

      await request(app).post('/api/manufacturers').send(manufacturer1).expect(201);
      await request(app).post('/api/manufacturers').send(manufacturer2).expect(201);

      const response = await request(app).get('/api/manufacturers').expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
      expect(response.body.some((m: { name: string }) => m.name === 'Manufacturer 1')).toBe(true);
      expect(response.body.some((m: { name: string }) => m.name === 'Manufacturer 2')).toBe(true);
    });

    it('должен вернуть пустой массив если производителей нет', async () => {
      const response = await request(app).get('/api/manufacturers').expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('GET /api/manufacturers/:id', () => {
    it('должен получить производителя по ID', async () => {
      const manufacturerData = { name: 'Manufacturer to Get' };

      const createResponse = await request(app)
        .post('/api/manufacturers')
        .send(manufacturerData)
        .expect(201);

      const manufacturerId = createResponse.body.id;

      const getResponse = await request(app)
        .get(`/api/manufacturers/${manufacturerId}`)
        .expect(201);

      expect(getResponse.body).toBeDefined();
      expect(getResponse.body.id).toBe(manufacturerId);
      expect(getResponse.body.name).toBe('Manufacturer to Get');
    });
  });

  describe('PUT /api/manufacturers/:id', () => {
    it('должен обновить производителя', async () => {
      const manufacturerData = { name: 'Original Manufacturer Name' };

      const createResponse = await request(app)
        .post('/api/manufacturers')
        .send(manufacturerData)
        .expect(201);

      const manufacturerId = createResponse.body.id;

      const updateData = {
        name: 'Updated Manufacturer Name',
        descriptionManufacturer: 'Updated Description',
      };

      const updateResponse = await request(app)
        .put(`/api/manufacturers/${manufacturerId}`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body).toBeDefined();
      expect(updateResponse.body.id).toBe(manufacturerId);
      expect(updateResponse.body.name).toBe('Updated Manufacturer Name');
    });

    it('должен обновить только указанные поля', async () => {
      const createResponse = await request(app)
        .post('/api/manufacturers')
        .send({ name: 'Original Name' })
        .expect(201);

      const updateResponse = await request(app)
        .put(`/api/manufacturers/${createResponse.body.id}`)
        .send({ name: 'New Name' })
        .expect(200);

      expect(updateResponse.body.name).toBe('New Name');
      expect(updateResponse.body.id).toBe(createResponse.body.id);
    });
  });

  describe('PUT /api/manufacturers/:id/products', () => {
    it('должен обновить список продуктов производителя', async () => {
      const manufacturerData = { name: 'Test Manufacturer' };

      const createResponse = await request(app)
        .post('/api/manufacturers')
        .send(manufacturerData)
        .expect(201);

      const manufacturerId = createResponse.body.id;

      const updateData = {
        productsIds: ['product-id-1', 'product-id-2'],
      };

      const updateResponse = await request(app)
        .put(`/api/manufacturers/${manufacturerId}/products`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body).toBeDefined();
      expect(updateResponse.body.id).toBe(manufacturerId);
    });
  });

  describe('DELETE /api/manufacturers/:id', () => {
    it('должен удалить производителя', async () => {
      const manufacturerData = { name: 'Manufacturer to Delete' };

      const createResponse = await request(app)
        .post('/api/manufacturers')
        .send(manufacturerData)
        .expect(201);

      const manufacturerId = createResponse.body.id;

      await request(app).delete(`/api/manufacturers/${manufacturerId}`).expect(204);

      const getResponse = await request(app)
        .get(`/api/manufacturers/${manufacturerId}`)
        .expect(201);

      expect(getResponse.body).toBeDefined();
    });
  });
});
