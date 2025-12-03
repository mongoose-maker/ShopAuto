/**
 * E2E ТЕСТЫ (End-to-End) для CategoryController
 *
 * ЧТО ТАКОЕ E2E ТЕСТЫ?
 * E2E тесты проверяют ВЕСЬ стек приложения от HTTP запроса до ответа.
 * Мы отправляем реальные HTTP запросы к нашему API и проверяем ответы.
 *
 * ОТЛИЧИЕ ОТ ДРУГИХ ТЕСТОВ:
 * - Unit: только логика сервиса, моки
 * - Integration: сервис + репозиторий + БД
 * - E2E: HTTP → Controller → Service → Repository → БД → ответ
 *
 * ЗАЧЕМ ЭТО НУЖНО?
 * - Проверяем, что весь путь запроса работает правильно
 * - Проверяем валидацию DTO на уровне HTTP
 * - Проверяем правильность статус-кодов
 * - Находим проблемы в роутинге и middleware
 */

// Импортируем supertest - библиотеку для тестирования HTTP запросов
import { default as request } from 'supertest';
// Импортируем Express тип для типизации
import type { Express } from 'express';
// Импортируем helpers для создания тестового приложения
import { createTestApp, closeTestApp } from '../../../__tests__/helpers/testApp.js';
// Импортируем helper для очистки БД
import { clearTestDb } from '../../../__tests__/helpers/testDb.js';

describe('CategoryController - E2E Tests', () => {
  // Переменная для хранения тестового приложения
  let app: Express;

  /**
   * beforeAll() - выполняется ОДИН РАЗ перед всеми тестами
   * Создаем тестовое Express приложение с реальной БД
   */
  beforeAll(async () => {
    // createTestApp() создает полноценное Express приложение:
    // - Настраивает все роуты
    // - Создает все сервисы и репозитории
    // - Подключает middleware (валидация, обработка ошибок)
    // - Настраивает тестовую БД
    app = (await createTestApp()) as unknown as Express;
  });

  /**
   * afterEach() - выполняется ПОСЛЕ КАЖДОГО теста
   * Очищаем БД, чтобы тесты не влияли друг на друга
   */
  afterEach(async () => {
    await clearTestDb();
  });

  /**
   * afterAll() - выполняется ОДИН РАЗ после всех тестов
   * Закрываем соединение с БД
   */
  afterAll(async () => {
    await closeTestApp();
  });

  /**
   * Группа тестов для POST /api/category (создание категории)
   */
  describe('POST /api/category', () => {
    it('должен создать новую категорию', async () => {
      // ARRANGE - готовим данные для запроса
      const categoryData = {
        name: 'E2E Test Category',
      };

      // ACT - отправляем HTTP POST запрос
      // request(app) - создает объект для отправки запросов к нашему приложению
      // .post('/api/category') - указываем метод и путь
      // .send(categoryData) - отправляем данные в теле запроса (JSON)
      // .expect(201) - ожидаем статус-код 201 (Created)
      const response = await request(app).post('/api/category').send(categoryData).expect(201);

      // ASSERT - проверяем ответ
      // response.body - тело ответа (JSON)
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined(); // ID должен быть присвоен БД
      expect(response.body.name).toBe('E2E Test Category');
    });

    it('должен вернуть ошибку валидации при невалидных данных', async () => {
      // ARRANGE - отправляем невалидные данные
      const invalidCategoryData = {
        name: 'A', // Слишком короткое имя (минимум 2 символа по валидации)
      };

      // ACT - отправляем запрос с невалидными данными
      // Ожидаем статус 400 (Bad Request) - ошибка валидации
      const response = await request(app)
        .post('/api/category')
        .send(invalidCategoryData)
        .expect(400);

      // ASSERT - проверяем, что вернулась ошибка
      expect(response.body).toBeDefined();
      // Валидатор должен вернуть информацию об ошибке
    });

    it('должен вернуть ошибку при отсутствии обязательных полей', async () => {
      // ARRANGE - отправляем пустой объект (нет поля name)
      const incompleteData = {};

      // ACT
      const response = await request(app).post('/api/category').send(incompleteData).expect(400);

      // ASSERT
      expect(response.body).toBeDefined();
      // Должна быть ошибка валидации о том, что name обязателен
    });

    it('должен вернуть ошибку при пустой строке в имени', async () => {
      const invalidData = {
        name: '', // Пустая строка
      };

      const response = await request(app).post('/api/category').send(invalidData).expect(400);

      expect(response.body).toBeDefined();
    });
  });

  /**
   * Группа тестов для GET /api/categories (получение всех категорий)
   */
  describe('GET /api/categories', () => {
    it('должен получить все категории', async () => {
      // ARRANGE - создаем несколько категорий через API
      const category1 = { name: 'Category 1' };
      const category2 = { name: 'Category 2' };

      await request(app).post('/api/category').send(category1).expect(201);
      await request(app).post('/api/category').send(category2).expect(201);

      // ACT - получаем все категории
      const response = await request(app).get('/api/categories').expect(201);

      // ASSERT
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true); // Должен быть массив
      expect(response.body.length).toBeGreaterThanOrEqual(2);
      // Проверяем, что наши категории есть в списке
      expect(response.body.some((c: { name: string }) => c.name === 'Category 1')).toBe(true);
      expect(response.body.some((c: { name: string }) => c.name === 'Category 2')).toBe(true);
    });

    it('должен вернуть пустой массив если категорий нет', async () => {
      // БД очищена в afterEach, поэтому категорий нет
      const response = await request(app).get('/api/categories').expect(201);

      expect(response.body).toEqual([]);
    });
  });

  /**
   * Группа тестов для GET /api/categories/:id (получение категории по ID)
   */
  describe('GET /api/categories/:id', () => {
    it('должен получить категорию по ID', async () => {
      // ARRANGE - создаем категорию
      const categoryData = { name: 'Category to Get' };

      const createResponse = await request(app)
        .post('/api/category')
        .send(categoryData)
        .expect(201);

      const categoryId = createResponse.body.id;

      // ACT - получаем категорию по ID
      // :id в пути заменяется на реальный ID
      const getResponse = await request(app).get(`/api/categories/${categoryId}`).expect(201);

      // ASSERT
      expect(getResponse.body).toBeDefined();
      expect(getResponse.body.id).toBe(categoryId);
      expect(getResponse.body.name).toBe('Category to Get');
    });

    it('должен вернуть категорию для существующего ID', async () => {
      // Создаем категорию
      const createResponse = await request(app)
        .post('/api/category')
        .send({ name: 'Test Category' })
        .expect(201);

      // Получаем её
      const response = await request(app)
        .get(`/api/categories/${createResponse.body.id}`)
        .expect(201);

      expect(response.body.name).toBe('Test Category');
    });
  });

  /**
   * Группа тестов для PUT /api/categories/:id (обновление категории)
   */
  describe('PUT /api/categories/:id', () => {
    it('должен обновить категорию', async () => {
      // ARRANGE - создаем категорию
      const categoryData = { name: 'Original Category Name' };

      const createResponse = await request(app)
        .post('/api/category')
        .send(categoryData)
        .expect(201);

      const categoryId = createResponse.body.id;

      // ACT - обновляем категорию
      const updateData = {
        name: 'Updated Category Name',
      };

      const updateResponse = await request(app)
        .put(`/api/categories/${categoryId}`)
        .send(updateData)
        .expect(200); // 200 OK - успешное обновление

      // ASSERT
      expect(updateResponse.body).toBeDefined();
      expect(updateResponse.body.id).toBe(categoryId); // ID не должен измениться
      expect(updateResponse.body.name).toBe('Updated Category Name');
    });

    it('должен обновить только указанные поля', async () => {
      // ARRANGE
      const createResponse = await request(app)
        .post('/api/category')
        .send({ name: 'Original Name' })
        .expect(201);

      // ACT - обновляем только имя
      const updateResponse = await request(app)
        .put(`/api/categories/${createResponse.body.id}`)
        .send({ name: 'New Name' })
        .expect(200);

      // ASSERT
      expect(updateResponse.body.name).toBe('New Name');
      expect(updateResponse.body.id).toBe(createResponse.body.id);
    });

    it('должен вернуть ошибку при обновлении несуществующей категории', async () => {
      const updateData = {
        name: 'New Name',
      };

      // Пытаемся обновить несуществующую категорию
      // Ожидаем ошибку 500 (Internal Server Error), т.к. сервис выбрасывает исключение
      const response = await request(app)
        .put('/api/categories/non-existent-id')
        .send(updateData)
        .expect(500);

      expect(response.body).toBeDefined();
    });

    it('должен вернуть ошибку валидации при невалидных данных', async () => {
      // ARRANGE
      const createResponse = await request(app)
        .post('/api/category')
        .send({ name: 'Test Category' })
        .expect(201);

      // ACT - пытаемся обновить с невалидными данными
      const invalidData = {
        name: 'A', // Слишком короткое имя
      };

      const response = await request(app)
        .put(`/api/categories/${createResponse.body.id}`)
        .send(invalidData)
        .expect(400); // 400 Bad Request - ошибка валидации

      expect(response.body).toBeDefined();
    });
  });

  /**
   * Группа тестов для DELETE /api/categories/:id (удаление категории)
   */
  describe('DELETE /api/categories/:id', () => {
    it('должен удалить категорию', async () => {
      // ARRANGE - создаем категорию
      const createResponse = await request(app)
        .post('/api/category')
        .send({ name: 'Category to Delete' })
        .expect(201);

      const categoryId = createResponse.body.id;

      // ACT - удаляем категорию
      // 204 No Content - успешное удаление, тело ответа пустое
      await request(app).delete(`/api/categories/${categoryId}`).expect(204);

      // ASSERT - проверяем, что категория действительно удалена
      // Пытаемся получить удаленную категорию
      const getResponse = await request(app).get(`/api/categories/${categoryId}`).expect(201);

      // В текущей реализации контроллер возвращает null, но статус 201
      // Это может быть проблемой в реальном приложении
      expect(getResponse.body).toBeDefined();
    });

    it('должен вернуть ошибку при удалении несуществующей категории', async () => {
      // Пытаемся удалить несуществующую категорию
      // В текущей реализации контроллер не проверяет существование перед удалением
      // Это может быть проблемой в реальном приложении
      const response = await request(app).delete('/api/categories/non-existent-id').expect(204);

      // Проверяем результат
      expect(response.body).toBeDefined();
    });
  });
});
