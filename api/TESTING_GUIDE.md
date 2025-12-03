# Руководство по тестированию Category

Этот документ объясняет, как работают тесты для сущности Category и как их использовать.

## Типы тестов

### 1. Unit тесты (`CategoryService.unit.test.ts`)

**Что тестируют:**

- Бизнес-логику `CategoryService` изолированно
- Валидацию данных
- Обработку ошибок

**Как работают:**

- Используют **моки** (mock) вместо реальных репозиториев
- Нет обращений к базе данных
- Быстрое выполнение

**Ключевые концепции:**

```typescript
// Создание мока репозитория
mockCategoryRepository = {
  addCategory: jest.fn(), // jest.fn() создает поддельную функцию
} as jest.Mocked<CategoryRepository>;

// Настройка поведения мока
mockCategoryRepository.addCategory.mockResolvedValue(mockCategory);
// Когда вызовут addCategory, вернется mockCategory

// Проверка вызова
expect(mockCategoryRepository.addCategory).toHaveBeenCalled();
// Проверяем, что метод был вызван
```

**Запуск:**

```bash
yarn test:unit
```

### 2. Integration тесты (`CategoryService.integration.test.ts`)

**Что тестируют:**

- Взаимодействие `CategoryService` с реальными репозиториями
- Работу с реальной базой данных
- Правильность SQL запросов
- Маппинг данных между доменом и БД

**Как работают:**

- Используют **реальные** репозитории (`SeqCategoryRepository`)
- Используют **тестовую** базу данных
- Медленнее, чем Unit тесты

**Ключевые концепции:**

```typescript
// Настройка тестовой БД (один раз перед всеми тестами)
beforeAll(async () => {
  await setupTestDb(); // Создает тестовую БД и таблицы
  categoryRepository = new SeqCategoryRepository(); // Реальный репозиторий
  categoryService = new CategoryService(categoryRepository);
});

// Очистка БД после каждого теста
afterEach(async () => {
  await clearTestDb(); // Удаляет все данные
});
```

**Запуск:**

```bash
yarn test:integration
```

**Требования:**

- Настроить `TEST_DATABASE_URL` в `.env` файле

### 3. E2E тесты (`CategoryController.e2e.test.ts`)

**Что тестируют:**

- Весь путь HTTP запроса: от клиента до БД и обратно
- Правильность роутинга
- Валидацию DTO на уровне HTTP
- Статус-коды ответов
- Работу middleware

**Как работают:**

- Отправляют **реальные HTTP запросы** к Express приложению
- Используют библиотеку `supertest`
- Тестируют весь стек: HTTP → Controller → Service → Repository → БД

**Ключевые концепции:**

```typescript
// Создание тестового приложения
app = await createTestApp(); // Полноценное Express приложение

// Отправка HTTP запроса
const response = await request(app)
  .post('/api/category') // Метод и путь
  .send({ name: 'Test' }) // Тело запроса (JSON)
  .expect(201); // Ожидаемый статус-код

// Проверка ответа
expect(response.body.name).toBe('Test');
```

**Запуск:**

```bash
yarn test:e2e
```

## Структура теста (AAA Pattern)

Все тесты следуют паттерну **AAA** (Arrange-Act-Assert):

```typescript
it('должен создать категорию', async () => {
  // ARRANGE (Подготовка) - готовим данные
  const dto: AddCategoryDto = {
    name: 'Test Category',
  };
  mockCategoryRepository.addCategory.mockResolvedValue(mockCategory);

  // ACT (Действие) - выполняем то, что тестируем
  const result = await categoryService.addCategory(dto);

  // ASSERT (Проверка) - проверяем результат
  expect(result).toEqual(mockCategory);
  expect(result.name).toBe('Test Category');
});
```

## Основные функции Jest

### `describe()` - группировка тестов

```typescript
describe('CategoryService', () => {
  describe('addCategory', () => {
    // тесты для addCategory
  });
});
```

### `it()` или `test()` - один тест

```typescript
it('должен создать категорию', async () => {
  // код теста
});
```

### `beforeAll()` - выполняется один раз перед всеми тестами

```typescript
beforeAll(async () => {
  await setupTestDb(); // Настройка БД
});
```

### `afterEach()` - выполняется после каждого теста

```typescript
afterEach(async () => {
  await clearTestDb(); // Очистка данных
});
```

### `expect()` - проверки

```typescript
expect(result).toBe(value); // Строгое равенство (===)
expect(result).toEqual(value); // Глубокое равенство
expect(result).toBeDefined(); // Проверка на undefined
expect(result).toBeNull(); // Проверка на null
expect(array.length).toBe(3); // Проверка числа
expect(mock).toHaveBeenCalled(); // Метод был вызван
expect(mock).toHaveBeenCalledWith(arg); // Метод вызван с аргументом
```

## Моки (Mocks)

Моки - это поддельные объекты, которые имитируют поведение реальных объектов.

### Создание мока

```typescript
const mockRepository = {
  addCategory: jest.fn(), // Поддельная функция
} as jest.Mocked<CategoryRepository>;
```

### Настройка поведения мока

```typescript
// Для асинхронных функций (Promise)
mockRepository.addCategory.mockResolvedValue(category); // Вернет category
mockRepository.getCategoryById.mockResolvedValue(null); // Вернет null

// Для синхронных функций
mockRepository.someMethod.mockReturnValue(value);
```

### Проверка вызовов мока

```typescript
// Проверка, что метод был вызван
expect(mockRepository.addCategory).toHaveBeenCalled();

// Проверка, что метод был вызван с конкретными аргументами
expect(mockRepository.addCategory).toHaveBeenCalledWith(category);

// Проверка, что метод НЕ был вызван
expect(mockRepository.addCategory).not.toHaveBeenCalled();
```

## Тестирование ошибок

```typescript
// Проверка, что функция выбрасывает ошибку
await expect(service.method()).rejects.toThrow('Error message');

// Проверка типа ошибки
await expect(service.method()).rejects.toThrow(Error);
```

## HTTP тестирование с Supertest

```typescript
// GET запрос
const response = await request(app).get('/api/categories').expect(200);

// POST запрос
const response = await request(app).post('/api/category').send({ name: 'Test' }).expect(201);

// PUT запрос
const response = await request(app)
  .put('/api/categories/123')
  .send({ name: 'Updated' })
  .expect(200);

// DELETE запрос
await request(app).delete('/api/categories/123').expect(204);
```

## Запуск тестов

```bash
# Все тесты
yarn test

# Только Unit тесты
yarn test:unit

# Только Integration тесты
yarn test:integration

# Только E2E тесты
yarn test:e2e

# С покрытием кода
yarn test:coverage

# В режиме watch (автоматический перезапуск)
yarn test:watch
```

## Покрытие кода

После запуска `yarn test:coverage` можно посмотреть отчет в папке `coverage/`.

Откройте `coverage/lcov-report/index.html` в браузере для визуального отчета.

## Советы

1. **Именование тестов**: Используйте описательные имена на русском языке

   ```typescript
   it('должен создать категорию с валидными данными', ...)
   ```

2. **Один тест - одна проверка**: Каждый тест должен проверять одну вещь

3. **Независимость тестов**: Тесты не должны зависеть друг от друга
   - Используйте `beforeEach` для настройки
   - Используйте `afterEach` для очистки

4. **Тестовые данные**: Создавайте понятные тестовые данные

   ```typescript
   const category = new Category('id-1', 'Test Category');
   ```

5. **Проверяйте граничные случаи**:
   - Пустые значения
   - Несуществующие ID
   - Невалидные данные

## Отладка тестов

Если тест не проходит:

1. Проверьте сообщение об ошибке
2. Используйте `console.log()` для вывода значений
3. Запустите один тест: `yarn test CategoryService.unit.test.ts`
4. Используйте `.only()` для запуска только одного теста:
   ```typescript
   it.only('мой тест', ...)
   ```
