# Анализ покрытия тестами

## Текущее состояние покрытия

### Покрыто тестами (1 из 9 сущностей = ~11%)

1. **Product**
   - Unit тесты: `ProductService.unit.test.ts` (401 строка)
   - Integration тесты: `ProductService.integration.test.ts` (273 строки)
   - E2E тесты: `ProductController.e2e.test.ts` (287 строк)
   - **Всего тестов**: ~15-20 тестовых случаев
   - **Покрытие методов**: ~100% для ProductService

### Не покрыто тестами (8 сущностей)

2. **Category**
   - Service: `CategoryService.ts` (40 строк, 6 методов)
   - Controller: `CategoryController.ts` (50 строк, 5 методов)
   - **Нужно**: Unit + Integration + E2E тесты

3. **Manufacturer**
   - Service: `ManufacturerService.ts` (60 строк, 6 методов)
   - Controller: `ManufacturerController.ts` (~63 строки)
   - **Нужно**: Unit + Integration + E2E тесты

4. **User**
   - Service: `UserService.ts`
   - Controller: `UserController.ts`
   - **Нужно**: Unit + Integration + E2E тесты
   - **Особенность**: Требует тестирования аутентификации (JWT)

5. **Address**
   - Service: `AddressService.ts`
   - Controller: `AddressController.ts`
   - **Нужно**: Unit + Integration + E2E тесты

6. **Cart**
   - Service: `CartService.ts`
   - Controller: `CartController.ts`
   - **Нужно**: Unit + Integration + E2E тесты
   - **Особенность**: Зависит от User и Product

7. **CartItem**
   - Service: `CartItemService.ts`
   - Controller: `CartItemController.ts`
   - **Нужно**: Unit + Integration + E2E тесты
   - **Особенность**: Зависит от Cart и Product

8. **Order**
   - Service: `OrderService.ts`
   - Controller: `OrderController.ts`
   - **Нужно**: Unit + Integration + E2E тесты
   - **Особенность**: Зависит от Cart, Product, Address, User

9. **OrderItem**
   - Service: `OrderItemService.ts`
   - Controller: `OrderItemController.ts`
   - **Нужно**: Unit + Integration + E2E тесты
   - **Особенность**: Зависит от Order и Product

## Оценка объема работы

### Для достижения 80% покрытия нужно:

#### Минимальный вариант (приоритетные сущности):

1. **Category** - простая сущность, ~3-4 часа работы
2. **Manufacturer** - простая сущность, ~3-4 часа работы
3. **User** - средняя сложность (JWT), ~5-6 часов работы
4. **Cart + CartItem** - средняя сложность, ~6-8 часов работы

**Итого минимум**: ~17-22 часа работы для покрытия основных сущностей

#### Полное покрытие всех сущностей:

- **Address**: ~3-4 часа
- **Order + OrderItem**: ~8-10 часов (сложная логика)

**Итого полное покрытие**: ~28-36 часов работы

## Структура тестов для каждой сущности

Для каждой сущности нужно создать:

### Unit тесты (моки репозиториев)

- Тестирование бизнес-логики Service
- Проверка валидации
- Обработка ошибок
- **Объем**: ~200-400 строк кода на сущность

### Integration тесты (реальная БД)

- Тестирование взаимодействия с репозиториями
- Проверка CRUD операций
- Тестирование связей между сущностями
- **Объем**: ~200-300 строк кода на сущность

### E2E тесты (HTTP запросы)

- Тестирование всех endpoints
- Проверка валидации DTO
- Тестирование статус-кодов
- **Объем**: ~200-400 строк кода на сущность

**Итого на сущность**: ~600-1100 строк тестового кода

## Рекомендации

### Приоритет 1 (быстрое покрытие):

1. **Category** - самая простая, можно использовать как шаблон
2. **Manufacturer** - похожа на Category

### Приоритет 2 (важные сущности):

3. **User** - критична для безопасности
4. **Cart + CartItem** - основная бизнес-логика

### Приоритет 3 (остальные):

5. **Address**
6. **Order + OrderItem**

## Текущее покрытие кода

**Примерная оценка**: ~11-15% покрытия кода

- Product: ~100% покрытие
- Остальные 8 сущностей: 0% покрытие
- **Среднее**: ~11-15% (зависит от размера файлов)

## Для достижения 80% покрытия

Нужно покрыть тестами минимум **6-7 из 9 сущностей** (67-78% сущностей).

Рекомендуемый план:

1. ✅ Product (уже сделано)
2. Category
3. Manufacturer
4. User
5. Cart + CartItem
6. Order + OrderItem (опционально, если нужно полное покрытие)

## Шаблон для создания тестов

Можно использовать тесты Product как шаблон:

- `ProductService.unit.test.ts` → шаблон для Unit тестов
- `ProductService.integration.test.ts` → шаблон для Integration тестов
- `ProductController.e2e.test.ts` → шаблон для E2E тестов
