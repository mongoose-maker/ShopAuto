import { ProductService } from '../ProductService.js';
import type { ProductRepository } from '../../repositories/ProductRepository/ProductRepository.js';
import type { ManufacturerRepository } from '../../repositories/ManufacturerRepository/ManufacturerRepository.js';
import type { CategoryRepository } from '../../repositories/CategoryRepository/CategoryRepository.js';
import { Product } from '../../models/Product/Product.js';
import { Manufacturer } from '../../models/Manufacturer/Manufacturer.js';
import { Category } from '../../models/Category/Category.js';
import { AddProductDto } from '../../repositories/ProductRepository/dto/addProductDto.js';
import { UpdateProductDto } from '../../repositories/ProductRepository/dto/updateProductDto.js';

describe('ProductService - Unit Tests', () => {
  let productService: ProductService;
  let mockProductRepository: jest.Mocked<ProductRepository>;
  let mockManufacturerRepository: jest.Mocked<ManufacturerRepository>;
  let mockCategoryRepository: jest.Mocked<CategoryRepository>;

  const mockManufacturer: Manufacturer = new Manufacturer(
    'manufacturer-id-1',
    'Test Manufacturer',
    'Test Description',
  );
  const mockCategory: Category = new Category('category-id-1', 'Test Category');
  const mockProduct: Product = new Product(
    'product-id-1',
    'ART-123456',
    'Test Product',
    mockManufacturer,
    mockCategory,
    'Test Description',
    100.5,
    true,
    4.5,
  );

  beforeEach(() => {
    mockProductRepository = {
      addProduct: jest.fn(),
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
      getProductByArticle: jest.fn(),
      updateProduct: jest.fn(),
      updateAvailability: jest.fn(),
      deleteProduct: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    mockManufacturerRepository = {
      getManufById: jest.fn(),
    } as jest.Mocked<ManufacturerRepository>;

    mockCategoryRepository = {
      getCategoryById: jest.fn(),
    } as jest.Mocked<CategoryRepository>;

    productService = new ProductService(
      mockProductRepository,
      mockManufacturerRepository,
      mockCategoryRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addProduct', () => {
    it('должен успешно создать продукт с валидными данными', async () => {
      const dto: AddProductDto = {
        name: 'Test Product',
        manufacturerId: 'manufacturer-id-1',
        categoryId: 'category-id-1',
        description: 'Test Description for Product',
        price: 100.5,
        availability: true,
        rating: 4.5,
      };

      mockManufacturerRepository.getManufById.mockResolvedValue(mockManufacturer);
      mockCategoryRepository.getCategoryById.mockResolvedValue(mockCategory);
      mockProductRepository.addProduct.mockResolvedValue(mockProduct);

      const result = await productService.addProduct(dto);

      expect(mockManufacturerRepository.getManufById).toHaveBeenCalledWith('manufacturer-id-1');
      expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith('category-id-1');
      expect(mockProductRepository.addProduct).toHaveBeenCalled();
      expect(result).toEqual(mockProduct);
      expect(result.name).toBe('Test Product');
      expect(result.price).toBe(100.5);
    });

    it('должен выбросить ошибку если производитель не найден', async () => {
      const dto: AddProductDto = {
        name: 'Test Product',
        manufacturerId: 'non-existent-manufacturer',
        categoryId: 'category-id-1',
        description: 'Test Description',
        price: 100.5,
        availability: true,
      };

      mockManufacturerRepository.getManufById.mockResolvedValue(null);

      await expect(productService.addProduct(dto)).rejects.toThrow(
        'Manufacturer with id non-existent-manufacturer not found',
      );

      expect(mockManufacturerRepository.getManufById).toHaveBeenCalledWith(
        'non-existent-manufacturer',
      );
      expect(mockCategoryRepository.getCategoryById).not.toHaveBeenCalled();
      expect(mockProductRepository.addProduct).not.toHaveBeenCalled();
    });

    it('должен выбросить ошибку если категория не найдена', async () => {
      const dto: AddProductDto = {
        name: 'Test Product',
        manufacturerId: 'manufacturer-id-1',
        categoryId: 'non-existent-category',
        description: 'Test Description',
        price: 100.5,
        availability: true,
      };

      mockManufacturerRepository.getManufById.mockResolvedValue(mockManufacturer);
      mockCategoryRepository.getCategoryById.mockResolvedValue(null);

      await expect(productService.addProduct(dto)).rejects.toThrow(
        'Category with id non-existent-category not found',
      );

      expect(mockManufacturerRepository.getManufById).toHaveBeenCalled();
      expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith('non-existent-category');
      expect(mockProductRepository.addProduct).not.toHaveBeenCalled();
    });

    it('должен использовать рейтинг по умолчанию 0 если не указан', async () => {
      const dto: AddProductDto = {
        name: 'Test Product',
        manufacturerId: 'manufacturer-id-1',
        categoryId: 'category-id-1',
        description: 'Test Description',
        price: 100.5,
        availability: true,
      };

      const productWithoutRating = new Product(
        'product-id-1',
        'ART-123456',
        'Test Product',
        mockManufacturer,
        mockCategory,
        'Test Description',
        100.5,
        true,
        0,
      );

      mockManufacturerRepository.getManufById.mockResolvedValue(mockManufacturer);
      mockCategoryRepository.getCategoryById.mockResolvedValue(mockCategory);
      mockProductRepository.addProduct.mockResolvedValue(productWithoutRating);

      const result = await productService.addProduct(dto);

      expect(result.rating).toBe(0);
    });
  });

  describe('getAllProducts', () => {
    it('должен вернуть все продукты', async () => {
      const products = [mockProduct];
      mockProductRepository.getAllProducts.mockResolvedValue(products);

      const result = await productService.getAllProducts();

      expect(mockProductRepository.getAllProducts).toHaveBeenCalled();
      expect(result).toEqual(products);
      expect(result.length).toBe(1);
    });

    it('должен вернуть пустой массив если продуктов нет', async () => {
      mockProductRepository.getAllProducts.mockResolvedValue([]);

      const result = await productService.getAllProducts();

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('getProductById', () => {
    it('должен вернуть продукт по ID', async () => {
      mockProductRepository.getProductById.mockResolvedValue(mockProduct);

      const result = await productService.getProductById('product-id-1');

      expect(mockProductRepository.getProductById).toHaveBeenCalledWith('product-id-1');
      expect(result).toEqual(mockProduct);
    });

    it('должен вернуть null если продукт не найден', async () => {
      mockProductRepository.getProductById.mockResolvedValue(null);

      const result = await productService.getProductById('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('getProductByArticle', () => {
    it('должен вернуть продукт по артикулу', async () => {
      mockProductRepository.getProductByArticle.mockResolvedValue(mockProduct);

      const result = await productService.getProductByArticle('ART-123456');

      expect(mockProductRepository.getProductByArticle).toHaveBeenCalledWith('ART-123456');
      expect(result).toEqual(mockProduct);
    });

    it('должен вернуть null если продукт не найден', async () => {
      mockProductRepository.getProductByArticle.mockResolvedValue(null);

      const result = await productService.getProductByArticle('NON-EXISTENT');

      expect(result).toBeNull();
    });
  });

  describe('updateProduct', () => {
    it('должен успешно обновить продукт', async () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Product Name',
        price: 200.75,
      };

      const updatedProduct = new Product(
        'product-id-1',
        'ART-123456',
        'Updated Product Name',
        mockManufacturer,
        mockCategory,
        'Test Description',
        200.75,
        true,
        4.5,
      );

      mockProductRepository.getProductById.mockResolvedValue(mockProduct);
      mockProductRepository.updateProduct.mockResolvedValue(updatedProduct);

      const result = await productService.updateProduct('product-id-1', updateDto);

      expect(mockProductRepository.getProductById).toHaveBeenCalledWith('product-id-1');
      expect(mockProductRepository.updateProduct).toHaveBeenCalled();
      expect(result).toEqual(updatedProduct);
      expect(result?.name).toBe('Updated Product Name');
      expect(result?.price).toBe(200.75);
    });

    it('должен выбросить ошибку если продукт не найден', async () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Name',
      };

      mockProductRepository.getProductById.mockResolvedValue(null);

      await expect(productService.updateProduct('non-existent-id', updateDto)).rejects.toThrow(
        'Product with id non-existent-id not found',
      );

      expect(mockProductRepository.updateProduct).not.toHaveBeenCalled();
    });

    it('должен обновить производителя если указан новый manufacturerId', async () => {
      const newManufacturer = new Manufacturer(
        'manufacturer-id-2',
        'New Manufacturer',
        'New Description',
      );
      const updateDto: UpdateProductDto = {
        manufacturerId: 'manufacturer-id-2',
      };

      mockProductRepository.getProductById.mockResolvedValue(mockProduct);
      mockManufacturerRepository.getManufById.mockResolvedValue(newManufacturer);

      const updatedProduct = new Product(
        'product-id-1',
        'ART-123456',
        'Test Product',
        newManufacturer,
        mockCategory,
        'Test Description',
        100.5,
        true,
        4.5,
      );

      mockProductRepository.updateProduct.mockResolvedValue(updatedProduct);

      const result = await productService.updateProduct('product-id-1', updateDto);

      expect(mockManufacturerRepository.getManufById).toHaveBeenCalledWith('manufacturer-id-2');
      expect(result?.manufacturer.id).toBe('manufacturer-id-2');
    });

    it('должен обновить категорию если указан новый categoryId', async () => {
      const newCategory = new Category('category-id-2', 'New Category');
      const updateDto: UpdateProductDto = {
        categoryId: 'category-id-2',
      };

      mockProductRepository.getProductById.mockResolvedValue(mockProduct);
      mockCategoryRepository.getCategoryById.mockResolvedValue(newCategory);

      const updatedProduct = new Product(
        'product-id-1',
        'ART-123456',
        'Test Product',
        mockManufacturer,
        newCategory,
        'Test Description',
        100.5,
        true,
        4.5,
      );

      mockProductRepository.updateProduct.mockResolvedValue(updatedProduct);

      const result = await productService.updateProduct('product-id-1', updateDto);

      expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith('category-id-2');
      expect(result?.category.id).toBe('category-id-2');
    });

    it('должен выбросить ошибку если новый производитель не найден', async () => {
      const updateDto: UpdateProductDto = {
        manufacturerId: 'non-existent-manufacturer',
      };

      mockProductRepository.getProductById.mockResolvedValue(mockProduct);
      mockManufacturerRepository.getManufById.mockResolvedValue(null);

      await expect(productService.updateProduct('product-id-1', updateDto)).rejects.toThrow(
        'Manufacturer with id non-existent-manufacturer not found',
      );
    });
  });

  describe('updateAvailability', () => {
    it('должен успешно обновить доступность продукта', async () => {
      const updatedProduct = new Product(
        'product-id-1',
        'ART-123456',
        'Test Product',
        mockManufacturer,
        mockCategory,
        'Test Description',
        100.5,
        false,
        4.5,
      );

      mockProductRepository.getProductById.mockResolvedValue(mockProduct);
      mockProductRepository.updateProduct.mockResolvedValue(updatedProduct);

      const result = await productService.updateAvailability('product-id-1', false);

      expect(mockProductRepository.getProductById).toHaveBeenCalledWith('product-id-1');
      expect(mockProductRepository.updateProduct).toHaveBeenCalled();
      expect(result?.availability).toBe(false);
    });

    it('должен выбросить ошибку если продукт не найден', async () => {
      mockProductRepository.getProductById.mockResolvedValue(null);

      await expect(productService.updateAvailability('non-existent-id', true)).rejects.toThrow(
        'Product with id non-existent-id not found',
      );
    });
  });

  describe('deleteProduct', () => {
    it('должен успешно удалить продукт', async () => {
      mockProductRepository.deleteProduct.mockResolvedValue(true);

      const result = await productService.deleteProduct('product-id-1');

      expect(mockProductRepository.deleteProduct).toHaveBeenCalledWith('product-id-1');
      expect(result).toBe(true);
    });

    it('должен вернуть false если продукт не найден', async () => {
      mockProductRepository.deleteProduct.mockResolvedValue(false);

      const result = await productService.deleteProduct('non-existent-id');

      expect(result).toBe(false);
    });
  });
});
