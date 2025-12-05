import { CategoryService } from '../../CategoryService.js';
import { Category } from '../../../models/Category/Category.js';
import { AddCategoryDto } from '../../../repositories/CategoryRepository/dto/addCategoryDto.js';
import { UpdateCategoryDto } from '../../../repositories/CategoryRepository/dto/updateCategoryDto.js';
describe('CategoryService - Unit Tests', () => {
    let categoryService;
    let mockCategoryRepository;
    const mockCategory = new Category('category-id-1', 'Test Category');
    beforeEach(() => {
        mockCategoryRepository = {
            addCategory: jest.fn(),
            getAllCategories: jest.fn(),
            getCategoryById: jest.fn(),
            updateCategory: jest.fn(),
            updateCategoryProducts: jest.fn(),
            deleteCategory: jest.fn(),
        };
        categoryService = new CategoryService(mockCategoryRepository);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('addCategory', () => {
        it('должен успешно создать категорию с валидными данными', async () => {
            const dto = {
                name: 'Test Category',
            };
            mockCategoryRepository.addCategory.mockResolvedValue(mockCategory);
            const result = await categoryService.addCategory(dto);
            expect(mockCategoryRepository.addCategory).toHaveBeenCalled();
            expect(result).toEqual(mockCategory);
            expect(result.name).toBe('Test Category');
            expect(result.id).toBeDefined();
        });
        it('должен создать категорию с правильным именем', async () => {
            const dto = {
                name: 'Electronics',
            };
            const createdCategory = new Category('new-id', 'Electronics');
            mockCategoryRepository.addCategory.mockResolvedValue(createdCategory);
            const result = await categoryService.addCategory(dto);
            expect(result.name).toBe('Electronics');
            expect(mockCategoryRepository.addCategory).toHaveBeenCalledWith(expect.objectContaining({
                name: 'Electronics',
            }));
        });
    });
    describe('getAllCategories', () => {
        it('должен вернуть все категории', async () => {
            const categories = [
                new Category('id-1', 'Category 1'),
                new Category('id-2', 'Category 2'),
                new Category('id-3', 'Category 3'),
            ];
            mockCategoryRepository.getAllCategories.mockResolvedValue(categories);
            const result = await categoryService.getAllCategories();
            expect(mockCategoryRepository.getAllCategories).toHaveBeenCalled();
            expect(result).toEqual(categories);
            expect(result.length).toBe(3);
        });
        it('должен вернуть пустой массив если категорий нет', async () => {
            mockCategoryRepository.getAllCategories.mockResolvedValue([]);
            const result = await categoryService.getAllCategories();
            expect(result).toEqual([]);
            expect(result.length).toBe(0);
        });
    });
    describe('getCategoryById', () => {
        it('должен вернуть категорию по ID', async () => {
            const categoryId = 'category-id-1';
            mockCategoryRepository.getCategoryById.mockResolvedValue(mockCategory);
            const result = await categoryService.getCategoryById(categoryId);
            expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(result).toEqual(mockCategory);
            expect(result?.id).toBe('category-id-1');
        });
        it('должен вернуть null если категория не найдена', async () => {
            const categoryId = 'non-existent-id';
            mockCategoryRepository.getCategoryById.mockResolvedValue(null);
            const result = await categoryService.getCategoryById(categoryId);
            expect(result).toBeNull();
            expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
        });
    });
    describe('updateCategory', () => {
        it('должен успешно обновить категорию', async () => {
            const categoryId = 'category-id-1';
            const updateDto = {
                name: 'Updated Category Name',
            };
            const updatedCategory = new Category(categoryId, 'Updated Category Name');
            mockCategoryRepository.getCategoryById.mockResolvedValue(mockCategory);
            mockCategoryRepository.updateCategory.mockResolvedValue(updatedCategory);
            const result = await categoryService.updateCategory(categoryId, updateDto);
            expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
            expect(mockCategoryRepository.updateCategory).toHaveBeenCalled();
            expect(result).toEqual(updatedCategory);
            expect(result?.name).toBe('Updated Category Name');
        });
        it('должен выбросить ошибку если категория не найдена', async () => {
            const categoryId = 'non-existent-id';
            const updateDto = {
                name: 'Updated Name',
            };
            mockCategoryRepository.getCategoryById.mockResolvedValue(null);
            await expect(categoryService.updateCategory(categoryId, updateDto)).rejects.toThrow('Category with id non-existent-id not found');
            expect(mockCategoryRepository.updateCategory).not.toHaveBeenCalled();
        });
        it('должен сохранить старое имя если новое не указано', async () => {
            const categoryId = 'category-id-1';
            const updateDto = {};
            const existingCategory = new Category(categoryId, 'Original Name');
            mockCategoryRepository.getCategoryById.mockResolvedValue(existingCategory);
            mockCategoryRepository.updateCategory.mockResolvedValue(existingCategory);
            const result = await categoryService.updateCategory(categoryId, updateDto);
            expect(result?.name).toBe('Original Name');
        });
    });
    describe('updateCategoryProducts', () => {
        it('должен обновить список продуктов категории', async () => {
            const categoryId = 'category-id-1';
            const productIds = ['product-1', 'product-2', 'product-3'];
            const updatedCategory = new Category(categoryId, 'Test Category');
            mockCategoryRepository.updateCategoryProducts.mockResolvedValue(updatedCategory);
            const result = await categoryService.updateCategoryProducts(categoryId, productIds);
            expect(mockCategoryRepository.updateCategoryProducts).toHaveBeenCalledWith(categoryId, productIds);
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
            const categoryId = 'category-id-1';
            mockCategoryRepository.deleteCategory.mockResolvedValue(true);
            const result = await categoryService.deleteCategory(categoryId);
            expect(mockCategoryRepository.deleteCategory).toHaveBeenCalledWith(categoryId);
            expect(result).toBe(true);
        });
        it('должен вернуть false если категория не найдена', async () => {
            const categoryId = 'non-existent-id';
            mockCategoryRepository.deleteCategory.mockResolvedValue(false);
            const result = await categoryService.deleteCategory(categoryId);
            expect(result).toBe(false);
        });
    });
});
//# sourceMappingURL=CategoryService.unit.test.js.map