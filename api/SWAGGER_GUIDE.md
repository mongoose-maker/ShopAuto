# Руководство по Swagger документации

## Установка

После установки зависимостей Swagger будет доступен автоматически:

```bash
yarn install
```

## Доступ к документации

После запуска сервера Swagger UI будет доступен по адресу:

- **Swagger UI**: http://localhost:3000/api-docs
- **JSON схема**: http://localhost:3000/api-docs.json

## Структура файлов

```
src/infrastructure/Swagger/
├── swagger.config.ts    # Конфигурация Swagger и определения схем
└── swagger.setup.ts     # Настройка Swagger UI в Express
```

## Как добавить документацию к эндпоинту

### 1. Добавьте JSDoc комментарии к роуту

В файле роутов (например, `ManufacturerRoutes.ts`) добавьте комментарии перед определением роута:

```typescript
/**
 * @swagger
 * /api/manufacturers:
 *   post:
 *     summary: Создать нового производителя
 *     tags: [Manufacturers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddManufacturerDto'
 *     responses:
 *       201:
 *         description: Производитель успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manufacturer'
 *       400:
 *         description: Ошибка валидации данных
 */
router.post('/manufacturers', ...);
```

### 2. Определите схемы в swagger.config.ts

Добавьте новые схемы в объект `components.schemas`:

```typescript
components: {
  schemas: {
    YourSchema: {
      type: 'object',
      properties: {
        field1: {
          type: 'string',
          description: 'Описание поля',
          example: 'Пример значения',
        },
      },
      required: ['field1'],
    },
  },
}
```

## Примеры документации

### GET запрос с параметром

```typescript
/**
 * @swagger
 * /api/manufacturers/{id}:
 *   get:
 *     summary: Получить производителя по ID
 *     tags: [Manufacturers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID производителя
 *     responses:
 *       200:
 *         description: Производитель найден
 */
```

### POST запрос с телом

```typescript
/**
 * @swagger
 * /api/manufacturers:
 *   post:
 *     summary: Создать нового производителя
 *     tags: [Manufacturers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddManufacturerDto'
 *     responses:
 *       201:
 *         description: Успешно создан
 */
```

### PUT/PATCH запрос

```typescript
/**
 * @swagger
 * /api/manufacturers/{id}:
 *   put:
 *     summary: Обновить производителя
 *     tags: [Manufacturers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateManufacturerDto'
 *     responses:
 *       200:
 *         description: Успешно обновлен
 */
```

### DELETE запрос

```typescript
/**
 * @swagger
 * /api/manufacturers/{id}:
 *   delete:
 *     summary: Удалить производителя
 *     tags: [Manufacturers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Успешно удален
 *       404:
 *         description: Не найден
 */
```

## Теги

Используйте теги для группировки эндпоинтов:

```typescript
/**
 * @swagger
 * tags:
 *   name: Manufacturers
 *   description: API для управления производителями
 */
```

## Статус коды ответов

Обязательно документируйте все возможные статус коды:

- `200` - Успешный запрос
- `201` - Ресурс создан
- `204` - Успешное удаление (без тела ответа)
- `400` - Ошибка валидации
- `404` - Ресурс не найден
- `500` - Внутренняя ошибка сервера

## Использование ссылок на схемы

Используйте `$ref` для переиспользования схем:

```typescript
schema: $ref: '#/components/schemas/Manufacturer';
```

## Массивы

Для массивов используйте:

```typescript
schema: type: array;
items: $ref: '#/components/schemas/Manufacturer';
```

## Параметры запроса

### Path параметры

```typescript
parameters:
  - in: path
    name: id
    required: true
    schema:
      type: string
```

### Query параметры

```typescript
parameters:
  - in: query
    name: page
    schema:
      type: integer
      default: 1
```

## Следующие шаги

1. Добавьте документацию для всех остальных роутов (Products, Categories, Users и т.д.)
2. Добавьте схемы для всех DTO
3. Добавьте примеры ответов
4. Настройте аутентификацию в Swagger (если используется JWT)

## Полезные ссылки

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger JSDoc](https://github.com/Surnet/swagger-jsdoc)
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)
