/**
 * UNIT ТЕСТЫ для CategoryService
 *
 * ЧТО ТАКОЕ UNIT ТЕСТЫ?
 * Unit тесты проверяют изолированную бизнес-логику сервиса БЕЗ реальной базы данных.
 * Мы используем "моки" (mock) - поддельные объекты, которые имитируют поведение репозиториев.
 *
 * ЗАЧЕМ ЭТО НУЖНО?
 * - Быстрое выполнение (нет обращений к БД)
 * - Изоляция - тестируем только логику сервиса
 * - Легко отлаживать - видим точно, где ошибка
 */

// Импортируем то, что будем тестировать
import { CategoryService } from '../CategoryService.js';
// Импортируем типы для создания моков
import type { CategoryRepository } from '../../repositories/CategoryRepository/CategoryRepository.js';
// Импортируем модели и DTO для создания тестовых данных
import { Category } from '../../models/Category/Category.js';
import { AddCategoryDto } from '../../repositories/CategoryRepository/dto/addCategoryDto.js';
import { UpdateCategoryDto } from '../../repositories/CategoryRepository/dto/updateCategoryDto.js';

/**
 * describe() - группирует связанные тесты
 * Первый параметр - название группы (что тестируем)
 * Второй параметр - функция с тестами
 */
describe('CategoryService - Unit Tests', () => {
  // Объявляем переменные, которые будут использоваться во всех тестах
  let categoryService: CategoryService;
  // jest.Mocked<> - специальный тип Jest для моков
  // Это говорит TypeScript, что у этого объекта есть методы jest.fn()
  let mockCategoryRepository: jest.Mocked<CategoryRepository>;

  // Создаем тестовые данные, которые будем использовать в тестах
  const mockCategory: Category = new Category('category-id-1', 'Test Category');

  /**
   * beforeEach() - выполняется ПЕРЕД КАЖДЫМ тестом
   * Здесь мы настраиваем "чистое" состояние для каждого теста
   */
  beforeEach(() => {
    // Создаем мок репозитория - поддельный объект, который имитирует CategoryRepository
    mockCategoryRepository = {
      // jest.fn() создает поддельную функцию, которую можно контролировать
      // Мы можем сказать ей, что вернуть (mockResolvedValue) или что она должна быть вызвана
      addCategory: jest.fn(),
      getAllCategories: jest.fn(),
      getCategoryById: jest.fn(),
      updateCategory: jest.fn(),
      updateCategoryProducts: jest.fn(),
      deleteCategory: jest.fn(),
    } as jest.Mocked<CategoryRepository>; // Приводим к типу мока

    // Создаем экземпляр сервиса, передавая ему мок репозитория
    // Теперь сервис будет использовать наш поддельный репозиторий
    categoryService = new CategoryService(mockCategoryRepository);
  });

  /**
   * afterEach() - выполняется ПОСЛЕ КАЖДОГО теста
   * Очищаем все моки, чтобы тесты не влияли друг на друга
   */
  afterEach(() => {
    jest.clearAllMocks(); // Очищает все вызовы и настройки моков
  });

  /**
   * Группа тестов для метода addCategory
   */
  describe('addCategory', () => {
    /**
     * it() или test() - один конкретный тест
     * Первый параметр - описание того, что тест проверяет (на русском для понятности)
     * Второй параметр - асинхронная функция с тестом
     */
    it('должен успешно создать категорию с валидными данными', async () => {
      // ARRANGE (Подготовка) - готовим данные для теста
      const dto: AddCategoryDto = {
        name: 'Test Category',
      };

      // Настраиваем мок: когда вызовут addCategory, вернуть mockCategory
      // mockResolvedValue - для асинхронных функций, которые возвращают Promise
      mockCategoryRepository.addCategory.mockResolvedValue(mockCategory);

      // ACT (Действие) - выполняем то, что тестируем
      const result = await categoryService.addCategory(dto);

      // ASSERT (Проверка) - проверяем результат
      // expect() - функция Jest для проверок
      // toHaveBeenCalled() - проверяет, что метод был вызван
      expect(mockCategoryRepository.addCategory).toHaveBeenCalled();
      // toEqual() - проверяет глубокое равенство объектов
      expect(result).toEqual(mockCategory);
      // toBe() - проверяет строгое равенство (===)
      expect(result.name).toBe('Test Category');
      // Проверяем, что у категории есть ID (она была создана)
      expect(result.id).toBeDefined();
    });

    it('должен создать категорию с правильным именем', async () => {
      const dto: AddCategoryDto = {
        name: 'Electronics',
      };

      // Создаем категорию с конкретным именем для этого теста
      const createdCategory = new Category('new-id', 'Electronics');
      mockCategoryRepository.addCategory.mockResolvedValue(createdCategory);

      const result = await categoryService.addCategory(dto);

      // Проверяем, что имя категории совпадает с тем, что мы передали
      expect(result.name).toBe('Electronics');
      // Проверяем, что метод репозитория был вызван с правильными данными
      // toHaveBeenCalledWith() - проверяет, что метод вызван с конкретными аргументами
      expect(mockCategoryRepository.addCategory).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Electronics',
        }),
      );
    });
  });

  describe('getAllCategories', () => {
    it('должен вернуть все категории', async () => {
      // ARRANGE - создаем массив категорий
      const categories = [
        new Category('id-1', 'Category 1'),
        new Category('id-2', 'Category 2'),
        new Category('id-3', 'Category 3'),
      ];

      // Настраиваем мок: getAllCategories вернет массив категорий
      mockCategoryRepository.getAllCategories.mockResolvedValue(categories);

      // ACT
      const result = await categoryService.getAllCategories();

      // ASSERT
      expect(mockCategoryRepository.getAllCategories).toHaveBeenCalled();
      expect(result).toEqual(categories);
      expect(result.length).toBe(3); // Проверяем количество
    });

    it('должен вернуть пустой массив если категорий нет', async () => {
      // Настраиваем мок: вернуть пустой массив
      mockCategoryRepository.getAllCategories.mockResolvedValue([]);

      const result = await categoryService.getAllCategories();

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('getCategoryById', () => {
    it('должен вернуть категорию по ID', async () => {
      // ARRANGE
      const categoryId = 'category-id-1';
      // Настраиваем мок: когда вызовут getCategoryById с этим ID, вернуть mockCategory
      mockCategoryRepository.getCategoryById.mockResolvedValue(mockCategory);

      // ACT
      const result = await categoryService.getCategoryById(categoryId);

      // ASSERT
      // Проверяем, что метод был вызван с правильным ID
      expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(mockCategory);
      expect(result?.id).toBe('category-id-1');
    });

    it('должен вернуть null если категория не найдена', async () => {
      const categoryId = 'non-existent-id';
      // Настраиваем мок: вернуть null (категория не найдена)
      mockCategoryRepository.getCategoryById.mockResolvedValue(null);

      const result = await categoryService.getCategoryById(categoryId);

      // Проверяем, что вернулся null
      expect(result).toBeNull();
      // Проверяем, что метод все равно был вызван
      expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
    });
  });

  describe('updateCategory', () => {
    it('должен успешно обновить категорию', async () => {
      // ARRANGE
      const categoryId = 'category-id-1';
      const updateDto: UpdateCategoryDto = {
        name: 'Updated Category Name',
      };

      // Создаем обновленную категорию
      const updatedCategory = new Category(categoryId, 'Updated Category Name');

      // Настраиваем моки:
      // 1. getCategoryById вернет существующую категорию (для проверки существования)
      mockCategoryRepository.getCategoryById.mockResolvedValue(mockCategory);
      // 2. updateCategory вернет обновленную категорию
      mockCategoryRepository.updateCategory.mockResolvedValue(updatedCategory);

      // ACT
      const result = await categoryService.updateCategory(categoryId, updateDto);

      // ASSERT
      // Проверяем, что сначала проверили существование категории
      expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
      // Проверяем, что обновление было вызвано
      expect(mockCategoryRepository.updateCategory).toHaveBeenCalled();
      // Проверяем результат
      expect(result).toEqual(updatedCategory);
      expect(result?.name).toBe('Updated Category Name');
    });

    it('должен выбросить ошибку если категория не найдена', async () => {
      // ARRANGE
      const categoryId = 'non-existent-id';
      const updateDto: UpdateCategoryDto = {
        name: 'Updated Name',
      };

      // Настраиваем мок: категория не найдена
      mockCategoryRepository.getCategoryById.mockResolvedValue(null);

      // ACT & ASSERT
      // expect().rejects.toThrow() - проверяет, что функция выбросила ошибку
      await expect(categoryService.updateCategory(categoryId, updateDto)).rejects.toThrow(
        'Category with id non-existent-id not found',
      );

      // Проверяем, что updateCategory НЕ был вызван (т.к. категория не найдена)
      expect(mockCategoryRepository.updateCategory).not.toHaveBeenCalled();
    });

    it('должен сохранить старое имя если новое не указано', async () => {
      const categoryId = 'category-id-1';
      // Пустой DTO - имя не обновляется
      const updateDto: UpdateCategoryDto = {};

      const existingCategory = new Category(categoryId, 'Original Name');
      mockCategoryRepository.getCategoryById.mockResolvedValue(existingCategory);
      // Обновленная категория с тем же именем
      mockCategoryRepository.updateCategory.mockResolvedValue(existingCategory);

      const result = await categoryService.updateCategory(categoryId, updateDto);

      // Проверяем, что имя осталось прежним
      expect(result?.name).toBe('Original Name');
    });
  });

  describe('updateCategoryProducts', () => {
    it('должен обновить список продуктов категории', async () => {
      // ARRANGE
      const categoryId = 'category-id-1';
      const productIds = ['product-1', 'product-2', 'product-3'];

      const updatedCategory = new Category(categoryId, 'Test Category');
      mockCategoryRepository.updateCategoryProducts.mockResolvedValue(updatedCategory);

      // ACT
      const result = await categoryService.updateCategoryProducts(categoryId, productIds);

      // ASSERT
      expect(mockCategoryRepository.updateCategoryProducts).toHaveBeenCalledWith(
        categoryId,
        productIds,
      );
      expect(result).toEqual(updatedCategory);
    });

    it('должен вернуть null если категория не найдена', async () => {
      const categoryId = 'non-existent-id';
      const productIds = ['product-1'];

      mockCategoryRepository.updateCategoryProducts.mockResolvedValue(null);

      const result = await categoryService.updateCategoryProducts(categoryId, productIds);

      expect(result).toBeNull();
    });
  });

  describe('deleteCategory', () => {
    it('должен успешно удалить категорию', async () => {
      // ARRANGE
      const categoryId = 'category-id-1';
      // Настраиваем мок: удаление успешно (вернет true)
      mockCategoryRepository.deleteCategory.mockResolvedValue(true);

      // ACT
      const result = await categoryService.deleteCategory(categoryId);

      // ASSERT
      expect(mockCategoryRepository.deleteCategory).toHaveBeenCalledWith(categoryId);
      expect(result).toBe(true);
    });

    it('должен вернуть false если категория не найдена', async () => {
      const categoryId = 'non-existent-id';
      // Настраиваем мок: удаление не удалось (вернет false)
      mockCategoryRepository.deleteCategory.mockResolvedValue(false);

      const result = await categoryService.deleteCategory(categoryId);

      expect(result).toBe(false);
    });
  });
});
