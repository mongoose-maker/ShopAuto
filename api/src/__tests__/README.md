# Тесты для Product

Этот каталог содержит тесты для сущности Product, включая Unit, Integration и E2E тесты.

## Структура тестов

### Unit тесты

- **Расположение**: `src/core/Service/__tests__/ProductService.unit.test.ts`
- **Описание**: Тестируют бизнес-логику ProductService с использованием моков для репозиториев
- **Запуск**: `yarn test:unit`

### Integration тесты

- **Расположение**: `src/core/Service/__tests__/ProductService.integration.test.ts`
- **Описание**: Тестируют взаимодействие ProductService с реальными репозиториями и тестовой БД
- **Запуск**: `yarn test:integration`
- **Требования**: Необходимо настроить `TEST_DATABASE_URL` в `.env` файле

### E2E тесты

- **Расположение**: `src/infrastructure/Controllers/__tests__/ProductController.e2e.test.ts`
- **Описание**: Тестируют HTTP endpoints через Supertest
- **Запуск**: `yarn test:e2e`
- **Требования**: Необходимо настроить `TEST_DATABASE_URL` в `.env` файле

## Настройка

1. Установите зависимости:

```bash
yarn install
```

2. Создайте тестовую базу данных PostgreSQL

3. Добавьте в `.env` файл:

```
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/test_db
```

## Запуск тестов

- Все тесты: `yarn test`
- Только Unit тесты: `yarn test:unit`
- Только Integration тесты: `yarn test:integration`
- Только E2E тесты: `yarn test:e2e`
- В режиме watch: `yarn test:watch`
- С покрытием кода: `yarn test:coverage`

## Покрытие кода

Требование: не менее 80% покрытия кода тестами.

Проверить покрытие:

```bash
yarn test:coverage
```

Результаты будут в папке `coverage/`.
