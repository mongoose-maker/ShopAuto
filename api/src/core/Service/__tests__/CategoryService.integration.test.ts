/**
 * INTEGRATION ТЕСТЫ для CategoryService
 *
 * ЧТО ТАКОЕ INTEGRATION ТЕСТЫ?
 * Integration тесты проверяют взаимодействие между компонентами с РЕАЛЬНОЙ базой данных.
 * Здесь мы используем настоящие репозитории и настоящую БД (но тестовую).
 *
 * ОТЛИЧИЕ ОТ UNIT ТЕСТОВ:
 * - Unit: моки, нет БД, быстро
 * - Integration: реальная БД, медленнее, но проверяет реальное взаимодействие
 *
 * ЗАЧЕМ ЭТО НУЖНО?
 * - Проверяем, что код работает с реальной БД
 * - Находим проблемы с SQL запросами
 * - Проверяем связи между таблицами
 * - Убеждаемся, что мапперы работают правильно
 */

// Импортируем реальные репозитории (не моки!)
import { CategoryService } from '../CategoryService.js';
import { SeqCategoryRepository } from '../../../infrastructure/DB/ORM/SeqRepositories/SeqCategoryRepository.js';
// Импортируем helpers для работы с тестовой БД
import { setupTestDb, teardownTestDb, clearTestDb } from '../../../__tests__/helpers/testDb.js';
// Импортируем модели и DTO
import { Category } from '../../models/Category/Category.js';
import { AddCategoryDto } from '../../repositories/CategoryRepository/dto/addCategoryDto.js';
import { UpdateCategoryDto } from '../../repositories/CategoryRepository/dto/updateCategoryDto.js';

describe('CategoryService - Integration Tests', () => {
  // Объявляем переменные для сервиса и репозитория
  let categoryService: CategoryService;
  let categoryRepository: SeqCategoryRepository;

  /**
   * beforeAll() - выполняется ОДИН РАЗ перед всеми тестами в этой группе
   * Здесь мы настраиваем тестовую БД и создаем сервис
   */
  beforeAll(async () => {
    // setupTestDb() - создает тестовую БД и синхронизирует все таблицы
    // Это может занять время, поэтому делаем один раз
    await setupTestDb();

    // Создаем РЕАЛЬНЫЙ репозиторий (не мок!)
    categoryRepository = new SeqCategoryRepository();

    // Создаем сервис с реальным репозиторием
    categoryService = new CategoryService(categoryRepository);
  });

  /**
   * afterEach() - выполняется ПОСЛЕ КАЖДОГО теста
   * Очищаем БД, чтобы тесты не влияли друг на друга
   */
  afterEach(async () => {
    // clearTestDb() - удаляет все данные из таблиц
    // Это важно, чтобы каждый тест начинался с "чистой" БД
    await clearTestDb();
  });

  /**
   * afterAll() - выполняется ОДИН РАЗ после всех тестов
   * Закрываем соединение с БД
   */
  afterAll(async () => {
    // teardownTestDb() - закрывает соединение с тестовой БД
    await teardownTestDb();
  });

  /**
   * Группа тестов для метода addCategory
   */
  describe('addCategory', () => {
    it('должен создать категорию в базе данных', async () => {
      // ARRANGE - готовим данные
      const dto: AddCategoryDto = {
        name: 'Integration Test Category',
      };

      // ACT - выполняем действие (создаем категорию в РЕАЛЬНОЙ БД)
      const result = await categoryService.addCategory(dto);

      // ASSERT - проверяем результат
      // Проверяем, что категория была создана (есть ID)
      expect(result).toBeDefined();
      expect(result.id).toBeDefined(); // ID присваивается БД
      expect(result.name).toBe('Integration Test Category');

      // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА: убеждаемся, что категория действительно в БД
      // Получаем категорию напрямую из репозитория
      const foundCategory = await categoryRepository.getCategoryById(result.id!);
      expect(foundCategory).not.toBeNull();
      expect(foundCategory?.name).toBe('Integration Test Category');
    });

    it('должен создать категорию с уникальным ID', async () => {
      const dto1: AddCategoryDto = { name: 'Category 1' };
      const dto2: AddCategoryDto = { name: 'Category 2' };

      // Создаем две категории
      const category1 = await categoryService.addCategory(dto1);
      const category2 = await categoryService.addCategory(dto2);

      // Проверяем, что у них разные ID (БД должна генерировать уникальные ID)
      expect(category1.id).not.toBe(category2.id);
      expect(category1.id).toBeDefined();
      expect(category2.id).toBeDefined();
    });
  });

  describe('getAllCategories', () => {
    it('должен получить все категории из базы данных', async () => {
      // ARRANGE - создаем несколько категорий
      const dto1: AddCategoryDto = { name: 'Category 1' };
      const dto2: AddCategoryDto = { name: 'Category 2' };
      const dto3: AddCategoryDto = { name: 'Category 3' };

      // Создаем категории в БД
      await categoryService.addCategory(dto1);
      await categoryService.addCategory(dto2);
      await categoryService.addCategory(dto3);

      // ACT - получаем все категории
      const categories = await categoryService.getAllCategories();

      // ASSERT
      expect(categories.length).toBeGreaterThanOrEqual(3);
      // Проверяем, что все созданные категории есть в результате
      expect(categories.some(c => c.name === 'Category 1')).toBe(true);
      expect(categories.some(c => c.name === 'Category 2')).toBe(true);
      expect(categories.some(c => c.name === 'Category 3')).toBe(true);
    });

    it('должен вернуть пустой массив если категорий нет', async () => {
      // БД уже очищена в afterEach, поэтому категорий нет
      const categories = await categoryService.getAllCategories();

      expect(categories).toEqual([]);
      expect(categories.length).toBe(0);
    });
  });

  describe('getCategoryById', () => {
    it('должен получить категорию по ID из базы данных', async () => {
      // ARRANGE - создаем категорию
      const dto: AddCategoryDto = {
        name: 'Category to Find',
      };

      const createdCategory = await categoryService.addCategory(dto);

      // ACT - получаем категорию по ID
      const foundCategory = await categoryService.getCategoryById(createdCategory.id!);

      // ASSERT
      expect(foundCategory).not.toBeNull();
      expect(foundCategory?.id).toBe(createdCategory.id);
      expect(foundCategory?.name).toBe('Category to Find');
    });

    it('должен вернуть null для несуществующего ID', async () => {
      // Пытаемся получить категорию с несуществующим ID
      const result = await categoryService.getCategoryById('non-existent-id-12345');

      expect(result).toBeNull();
    });
  });

  describe('updateCategory', () => {
    it('должен обновить категорию в базе данных', async () => {
      // ARRANGE - создаем категорию
      const dto: AddCategoryDto = {
        name: 'Original Category Name',
      };

      const createdCategory = await categoryService.addCategory(dto);

      // ACT - обновляем категорию
      const updateDto: UpdateCategoryDto = {
        name: 'Updated Category Name',
      };

      const updatedCategory = await categoryService.updateCategory(createdCategory.id!, updateDto);

      // ASSERT
      expect(updatedCategory).not.toBeNull();
      expect(updatedCategory?.id).toBe(createdCategory.id); // ID не должен измениться
      expect(updatedCategory?.name).toBe('Updated Category Name');

      // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА: получаем категорию из БД и проверяем, что она обновлена
      const foundCategory = await categoryRepository.getCategoryById(createdCategory.id!);
      expect(foundCategory?.name).toBe('Updated Category Name');
    });

    it('должен сохранить старое имя если новое не указано', async () => {
      // ARRANGE
      const dto: AddCategoryDto = { name: 'Original Name' };
      const createdCategory = await categoryService.addCategory(dto);

      // ACT - обновляем без указания нового имени
      const updateDto: UpdateCategoryDto = {}; // Пустой DTO

      const updatedCategory = await categoryService.updateCategory(createdCategory.id!, updateDto);

      // ASSERT - имя должно остаться прежним
      expect(updatedCategory?.name).toBe('Original Name');
    });

    it('должен выбросить ошибку при обновлении несуществующей категории', async () => {
      const updateDto: UpdateCategoryDto = {
        name: 'New Name',
      };

      // Ожидаем, что будет выброшена ошибка
      await expect(categoryService.updateCategory('non-existent-id', updateDto)).rejects.toThrow(
        'Category with id non-existent-id not found',
      );
    });
  });

  describe('updateCategoryProducts', () => {
    it('должен обновить список продуктов категории', async () => {
      // ARRANGE - создаем категорию
      const dto: AddCategoryDto = { name: 'Test Category' };
      const createdCategory = await categoryService.addCategory(dto);

      const productIds = ['product-id-1', 'product-id-2', 'product-id-3'];

      // ACT
      const result = await categoryService.updateCategoryProducts(createdCategory.id!, productIds);

      // ASSERT
      expect(result).not.toBeNull();
      expect(result?.id).toBe(createdCategory.id);
    });
  });

  describe('deleteCategory', () => {
    it('должен удалить категорию из базы данных', async () => {
      // ARRANGE - создаем категорию
      const dto: AddCategoryDto = {
        name: 'Category to Delete',
      };

      const createdCategory = await categoryService.addCategory(dto);

      // ACT - удаляем категорию
      const deleteResult = await categoryService.deleteCategory(createdCategory.id!);

      // ASSERT
      expect(deleteResult).toBe(true);

      // ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА: убеждаемся, что категория действительно удалена
      const foundCategory = await categoryService.getCategoryById(createdCategory.id!);
      expect(foundCategory).toBeNull();
    });

    it('должен вернуть false при попытке удалить несуществующую категорию', async () => {
      const result = await categoryService.deleteCategory('non-existent-id');

      expect(result).toBe(false);
    });
  });
});
