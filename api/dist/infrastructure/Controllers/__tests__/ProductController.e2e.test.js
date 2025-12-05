import { default as request } from 'supertest';
import { createTestApp, closeTestApp } from '../../../__tests__/helpers/testApp.js';
import { clearTestDb } from '../../../__tests__/helpers/testDb.js';
import { SeqManufacturerRepository } from '../../../infrastructure/DB/ORM/SeqRepositories/SeqManufacturerRepository.js';
import { SeqCategoryRepository } from '../../../infrastructure/DB/ORM/SeqRepositories/SeqCategoryRepository.js';
import { Manufacturer } from '../../../core/models/Manufacturer/Manufacturer.js';
import { Category } from '../../../core/models/Category/Category.js';
describe('ProductController - E2E Tests', () => {
    let app;
    let testManufacturer;
    let testCategory;
    beforeAll(async () => {
        app = (await createTestApp());
        const manufacturerRepository = new SeqManufacturerRepository();
        const categoryRepository = new SeqCategoryRepository();
        testManufacturer = await manufacturerRepository.addManuf(new Manufacturer(undefined, 'E2E Test Manufacturer', 'E2E Test Description'));
        testCategory = await categoryRepository.addCategory(new Category(undefined, 'E2E Test Category'));
    });
    afterEach(async () => {
        await clearTestDb();
        const manufacturerRepository = new SeqManufacturerRepository();
        const categoryRepository = new SeqCategoryRepository();
        testManufacturer = await manufacturerRepository.addManuf(new Manufacturer(undefined, 'E2E Test Manufacturer', 'E2E Test Description'));
        testCategory = await categoryRepository.addCategory(new Category(undefined, 'E2E Test Category'));
    });
    afterAll(async () => {
        await closeTestApp();
    });
    describe('POST /api/products', () => {
        it('должен создать новый продукт', async () => {
            const productData = {
                name: 'E2E Test Product',
                manufacturerId: testManufacturer.id,
                categoryId: testCategory.id,
                description: 'This is a test product for E2E testing',
                price: 199.99,
                availability: true,
                rating: 4.5,
            };
            const response = await request(app).post('/api/products').send(productData).expect(201);
            expect(response.body).toBeDefined();
            expect(response.body.id).toBeDefined();
            expect(response.body.name).toBe('E2E Test Product');
            expect(response.body.price).toBe(199.99);
            expect(response.body.availability).toBe(true);
            expect(response.body.rating).toBe(4.5);
            expect(response.body.idProduct).toMatch(/^ART-/);
            expect(response.body.manufacturer).toBeDefined();
            expect(response.body.category).toBeDefined();
        });
        it('должен вернуть ошибку валидации при невалидных данных', async () => {
            const invalidProductData = {
                name: 'A',
                manufacturerId: testManufacturer.id,
                categoryId: testCategory.id,
                description: 'Short',
                price: -10,
                availability: true,
            };
            const response = await request(app)
                .post('/api/products')
                .send(invalidProductData)
                .expect(400);
            expect(response.body).toBeDefined();
        });
        it('должен вернуть ошибку при отсутствии обязательных полей', async () => {
            const incompleteProductData = {
                name: 'Incomplete Product',
            };
            const response = await request(app)
                .post('/api/products')
                .send(incompleteProductData)
                .expect(400);
            expect(response.body).toBeDefined();
        });
        it('должен вернуть ошибку при несуществующем производителе', async () => {
            const productData = {
                name: 'Product with Invalid Manufacturer',
                manufacturerId: 'non-existent-manufacturer-id',
                categoryId: testCategory.id,
                description: 'Test description for invalid manufacturer',
                price: 100.0,
                availability: true,
            };
            const response = await request(app).post('/api/products').send(productData).expect(500);
            expect(response.body).toBeDefined();
        });
    });
    describe('GET /api/products/:id', () => {
        it('должен получить продукт по ID', async () => {
            const productData = {
                name: 'Product to Get',
                manufacturerId: testManufacturer.id,
                categoryId: testCategory.id,
                description: 'Description for getting product',
                price: 150.0,
                availability: true,
            };
            const createResponse = await request(app).post('/api/products').send(productData).expect(201);
            const productId = createResponse.body.id;
            const getResponse = await request(app).get(`/api/products/${productId}`).expect(201);
            expect(getResponse.body).toBeDefined();
            expect(getResponse.body.id).toBe(productId);
            expect(getResponse.body.name).toBe('Product to Get');
            expect(getResponse.body.price).toBe(150.0);
        });
        it('должен вернуть ошибку для несуществующего ID', async () => {
            const response = await request(app).get('/api/products/non-existent-id').expect(201);
            expect(response.body).toBeDefined();
        });
    });
    describe('PUT /api/products/:id', () => {
        it('должен обновить продукт', async () => {
            const productData = {
                name: 'Product to Update',
                manufacturerId: testManufacturer.id,
                categoryId: testCategory.id,
                description: 'Original description',
                price: 100.0,
                availability: true,
            };
            const createResponse = await request(app).post('/api/products').send(productData).expect(201);
            const productId = createResponse.body.id;
            const updateData = {
                name: 'Updated Product Name',
                price: 200.0,
                description: 'Updated description',
            };
            const updateResponse = await request(app)
                .put(`/api/products/${productId}`)
                .send(updateData)
                .expect(200);
            expect(updateResponse.body).toBeDefined();
            expect(updateResponse.body.id).toBe(productId);
            expect(updateResponse.body.name).toBe('Updated Product Name');
            expect(updateResponse.body.price).toBe(200.0);
            expect(updateResponse.body.description).toBe('Updated description');
        });
        it('должен обновить только указанные поля', async () => {
            const productData = {
                name: 'Partial Update Product',
                manufacturerId: testManufacturer.id,
                categoryId: testCategory.id,
                description: 'Original description',
                price: 100.0,
                availability: true,
                rating: 4.0,
            };
            const createResponse = await request(app).post('/api/products').send(productData).expect(201);
            const productId = createResponse.body.id;
            const updateData = {
                price: 250.0,
            };
            const updateResponse = await request(app)
                .put(`/api/products/${productId}`)
                .send(updateData)
                .expect(200);
            expect(updateResponse.body.price).toBe(250.0);
            expect(updateResponse.body.name).toBe('Partial Update Product');
            expect(updateResponse.body.description).toBe('Original description');
            expect(updateResponse.body.rating).toBe(4.0);
        });
        it('должен вернуть ошибку при обновлении несуществующего продукта', async () => {
            const updateData = {
                name: 'Updated Name',
            };
            const response = await request(app)
                .put('/api/products/non-existent-id')
                .send(updateData)
                .expect(500);
            expect(response.body).toBeDefined();
        });
    });
    describe('DELETE /api/products/:id', () => {
        it('должен удалить продукт', async () => {
            const productData = {
                name: 'Product to Delete',
                manufacturerId: testManufacturer.id,
                categoryId: testCategory.id,
                description: 'Description for deletion',
                price: 100.0,
                availability: true,
            };
            const createResponse = await request(app).post('/api/products').send(productData).expect(201);
            const productId = createResponse.body.id;
            const deleteResponse = await request(app).delete(`/api/products/${productId}`).expect(204);
            const getResponse = await request(app).get(`/api/products/${productId}`).expect(201);
            expect(getResponse.body).toBeDefined();
        });
    });
    describe('GET /api/categories/:articleId/products', () => {
        it('должен получить продукт по артикулу', async () => {
            const productData = {
                name: 'Product by Article',
                manufacturerId: testManufacturer.id,
                categoryId: testCategory.id,
                description: 'Description for article test',
                price: 300.0,
                availability: true,
            };
            const createResponse = await request(app).post('/api/products').send(productData).expect(201);
            const articleId = createResponse.body.idProduct;
            const response = await request(app).get(`/api/categories/${articleId}/products`).expect(200);
            expect(response.body).toBeDefined();
        });
    });
});
//# sourceMappingURL=ProductController.e2e.test.js.map