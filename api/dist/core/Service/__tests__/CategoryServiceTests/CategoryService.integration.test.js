import { CategoryService } from '../../CategoryService.js';
import { SeqCategoryRepository } from '../../../../infrastructure/DB/ORM/SeqRepositories/SeqCategoryRepository.js';
import { setupTestDb, teardownTestDb, clearTestDb } from '../../../../__tests__/helpers/testDb.js';
import { Category } from '../../../models/Category/Category.js';
import { AddCategoryDto } from '../../../repositories/CategoryRepository/dto/addCategoryDto.js';
import { UpdateCategoryDto } from '../../../repositories/CategoryRepository/dto/updateCategoryDto.js';
describe('CategoryService - Integration Tests', () => {
    let categoryService;
    let categoryRepository;
    beforeAll(async () => {
        await setupTestDb();
        categoryRepository = new SeqCategoryRepository();
        categoryService = new CategoryService(categoryRepository);
    });
    afterEach(async () => {
        await clearTestDb();
    });
    afterAll(async () => {
        await teardownTestDb();
    });
    describe('addCategory', () => {
        it('должен создать категорию в базе данных', async () => {
            const dto = {
                name: 'Integration Test Category',
            };
            const result = await categoryService.addCategory(dto);
            expect(result).toBeDefined();
            expect(result.id).toBeDefined();
            expect(result.name).toBe('Integration Test Category');
            const foundCategory = await categoryRepository.getCategoryById(result.id);
            expect(foundCategory).not.toBeNull();
            expect(foundCategory?.name).toBe('Integration Test Category');
        });
        it('должен создать категорию с уникальным ID', async () => {
            const dto1 = { name: 'Category 1' };
            const dto2 = { name: 'Category 2' };
            const category1 = await categoryService.addCategory(dto1);
            const category2 = await categoryService.addCategory(dto2);
            expect(category1.id).not.toBe(category2.id);
            expect(category1.id).toBeDefined();
            expect(category2.id).toBeDefined();
        });
    });
    describe('getAllCategories', () => {
        it('должен получить все категории из базы данных', async () => {
            const dto1 = { name: 'Category 1' };
            const dto2 = { name: 'Category 2' };
            const dto3 = { name: 'Category 3' };
            await categoryService.addCategory(dto1);
            await categoryService.addCategory(dto2);
            await categoryService.addCategory(dto3);
            const categories = await categoryService.getAllCategories();
            expect(categories.length).toBeGreaterThanOrEqual(3);
            expect(categories.some(c => c.name === 'Category 1')).toBe(true);
            expect(categories.some(c => c.name === 'Category 2')).toBe(true);
            expect(categories.some(c => c.name === 'Category 3')).toBe(true);
        });
        it('должен вернуть пустой массив если категорий нет', async () => {
            const categories = await categoryService.getAllCategories();
            expect(categories).toEqual([]);
            expect(categories.length).toBe(0);
        });
    });
    describe('getCategoryById', () => {
        it('должен получить категорию по ID из базы данных', async () => {
            const dto = {
                name: 'Category to Find',
            };
            const createdCategory = await categoryService.addCategory(dto);
            const foundCategory = await categoryService.getCategoryById(createdCategory.id);
            expect(foundCategory).not.toBeNull();
            expect(foundCategory?.id).toBe(createdCategory.id);
            expect(foundCategory?.name).toBe('Category to Find');
        });
        it('должен вернуть null для несуществующего ID', async () => {
            const result = await categoryService.getCategoryById('non-existent-id-12345');
            expect(result).toBeNull();
        });
    });
    describe('updateCategory', () => {
        it('должен обновить категорию в базе данных', async () => {
            const dto = {
                name: 'Original Category Name',
            };
            const createdCategory = await categoryService.addCategory(dto);
            const updateDto = {
                name: 'Updated Category Name',
            };
            const updatedCategory = await categoryService.updateCategory(createdCategory.id, updateDto);
            expect(updatedCategory).not.toBeNull();
            expect(updatedCategory?.id).toBe(createdCategory.id);
            expect(updatedCategory?.name).toBe('Updated Category Name');
            const foundCategory = await categoryRepository.getCategoryById(createdCategory.id);
            expect(foundCategory?.name).toBe('Updated Category Name');
        });
        it('должен сохранить старое имя если новое не указано', async () => {
            const dto = { name: 'Original Name' };
            const createdCategory = await categoryService.addCategory(dto);
            const updateDto = {};
            const updatedCategory = await categoryService.updateCategory(createdCategory.id, updateDto);
            expect(updatedCategory?.name).toBe('Original Name');
        });
        it('должен выбросить ошибку при обновлении несуществующей категории', async () => {
            const updateDto = {
                name: 'New Name',
            };
            await expect(categoryService.updateCategory('non-existent-id', updateDto)).rejects.toThrow('Category with id non-existent-id not found');
        });
    });
    describe('updateCategoryProducts', () => {
        it('должен обновить список продуктов категории', async () => {
            const dto = { name: 'Test Category' };
            const createdCategory = await categoryService.addCategory(dto);
            const productIds = ['product-id-1', 'product-id-2', 'product-id-3'];
            const result = await categoryService.updateCategoryProducts(createdCategory.id, productIds);
            expect(result).not.toBeNull();
            expect(result?.id).toBe(createdCategory.id);
        });
    });
    describe('deleteCategory', () => {
        it('должен удалить категорию из базы данных', async () => {
            const dto = {
                name: 'Category to Delete',
            };
            const createdCategory = await categoryService.addCategory(dto);
            const deleteResult = await categoryService.deleteCategory(createdCategory.id);
            expect(deleteResult).toBe(true);
            const foundCategory = await categoryService.getCategoryById(createdCategory.id);
            expect(foundCategory).toBeNull();
        });
        it('должен вернуть false при попытке удалить несуществующую категорию', async () => {
            const result = await categoryService.deleteCategory('non-existent-id');
            expect(result).toBe(false);
        });
    });
});
//# sourceMappingURL=CategoryService.integration.test.js.map