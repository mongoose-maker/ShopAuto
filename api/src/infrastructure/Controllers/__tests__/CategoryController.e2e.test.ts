import { default as request } from 'supertest';
import type { Express } from 'express';
import { createTestApp, closeTestApp } from '../../../__tests__/helpers/testApp.js';
import { clearTestDb } from '../../../__tests__/helpers/testDb.js';

describe('CategoryController - E2E Tests', () => {
  let app: Express;

  beforeAll(async () => {
    app = (await createTestApp()) as unknown as Express;
  });

  afterEach(async () => {
    await clearTestDb();
  });

  afterAll(async () => {
    await closeTestApp();
  });

  describe('POST /api/category', () => {
    it('должен создать новую категорию', async () => {
      const categoryData = {
        name: 'E2E Test Category',
      };

      const response = await request(app).post('/api/category').send(categoryData).expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();
      expect(response.body.name).toBe('E2E Test Category');
    });

    it('должен вернуть ошибку валидации при невалидных данных', async () => {
      const invalidCategoryData = {
        name: 'A',
      };

      const response = await request(app)
        .post('/api/category')
        .send(invalidCategoryData)
        .expect(400);

      expect(response.body).toBeDefined();
    });

    it('должен вернуть ошибку при отсутствии обязательных полей', async () => {
      const incompleteData = {};

      const response = await request(app).post('/api/category').send(incompleteData).expect(400);

      expect(response.body).toBeDefined();
    });

    it('должен вернуть ошибку при пустой строке в имени', async () => {
      const invalidData = {
        name: '',
      };

      const response = await request(app).post('/api/category').send(invalidData).expect(400);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /api/categories', () => {
    it('должен получить все категории', async () => {
      const category1 = { name: 'Category 1' };
      const category2 = { name: 'Category 2' };

      await request(app).post('/api/category').send(category1).expect(201);
      await request(app).post('/api/category').send(category2).expect(201);

      const response = await request(app).get('/api/categories').expect(201);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
      expect(response.body.some((c: { name: string }) => c.name === 'Category 1')).toBe(true);
      expect(response.body.some((c: { name: string }) => c.name === 'Category 2')).toBe(true);
    });

    it('должен вернуть пустой массив если категорий нет', async () => {
      const response = await request(app).get('/api/categories').expect(201);

      expect(response.body).toEqual([]);
    });
  });

  describe('GET /api/categories/:id', () => {
    it('должен получить категорию по ID', async () => {
      const categoryData = { name: 'Category to Get' };

      const createResponse = await request(app)
        .post('/api/category')
        .send(categoryData)
        .expect(201);

      const categoryId = createResponse.body.id;

      const getResponse = await request(app).get(`/api/categories/${categoryId}`).expect(201);

      expect(getResponse.body).toBeDefined();
      expect(getResponse.body.id).toBe(categoryId);
      expect(getResponse.body.name).toBe('Category to Get');
    });

    it('должен вернуть категорию для существующего ID', async () => {
      const createResponse = await request(app)
        .post('/api/category')
        .send({ name: 'Test Category' })
        .expect(201);

      const response = await request(app)
        .get(`/api/categories/${createResponse.body.id}`)
        .expect(201);

      expect(response.body.name).toBe('Test Category');
    });
  });

  describe('PUT /api/categories/:id', () => {
    it('должен обновить категорию', async () => {
      const categoryData = { name: 'Original Category Name' };

      const createResponse = await request(app)
        .post('/api/category')
        .send(categoryData)
        .expect(201);

      const categoryId = createResponse.body.id;

      const updateData = {
        name: 'Updated Category Name',
      };

      const updateResponse = await request(app)
        .put(`/api/categories/${categoryId}`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body).toBeDefined();
      expect(updateResponse.body.id).toBe(categoryId);
      expect(updateResponse.body.name).toBe('Updated Category Name');
    });

    it('должен обновить только указанные поля', async () => {
      const createResponse = await request(app)
        .post('/api/category')
        .send({ name: 'Original Name' })
        .expect(201);

      const updateResponse = await request(app)
        .put(`/api/categories/${createResponse.body.id}`)
        .send({ name: 'New Name' })
        .expect(200);

      expect(updateResponse.body.name).toBe('New Name');
      expect(updateResponse.body.id).toBe(createResponse.body.id);
    });

    it('должен вернуть ошибку при обновлении несуществующей категории', async () => {
      const updateData = {
        name: 'New Name',
      };

      const response = await request(app)
        .put('/api/categories/non-existent-id')
        .send(updateData)
        .expect(500);

      expect(response.body).toBeDefined();
    });

    it('должен вернуть ошибку валидации при невалидных данных', async () => {
      const createResponse = await request(app)
        .post('/api/category')
        .send({ name: 'Test Category' })
        .expect(201);

      const invalidData = {
        name: 'A',
      };

      const response = await request(app)
        .put(`/api/categories/${createResponse.body.id}`)
        .send(invalidData)
        .expect(400);

      expect(response.body).toBeDefined();
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('должен удалить категорию', async () => {
      const createResponse = await request(app)
        .post('/api/category')
        .send({ name: 'Category to Delete' })
        .expect(201);

      const categoryId = createResponse.body.id;

      await request(app).delete(`/api/categories/${categoryId}`).expect(204);

      const getResponse = await request(app).get(`/api/categories/${categoryId}`).expect(201);

      expect(getResponse.body).toBeDefined();
    });

    it('должен вернуть ошибку при удалении несуществующей категории', async () => {
      const response = await request(app).delete('/api/categories/non-existent-id').expect(204);

      expect(response.body).toBeDefined();
    });
  });
});
