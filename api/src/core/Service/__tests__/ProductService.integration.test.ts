import { ProductService } from '../ProductService.js';
import { SeqProductRepository } from '../../../infrastructure/DB/ORM/SeqRepositories/seqProductRepository.js';
import { SeqManufacturerRepository } from '../../../infrastructure/DB/ORM/SeqRepositories/SeqManufacturerRepository.js';
import { SeqCategoryRepository } from '../../../infrastructure/DB/ORM/SeqRepositories/SeqCategoryRepository.js';
import { setupTestDb, teardownTestDb, clearTestDb } from '../../../__tests__/helpers/testDb.js';
import { AddProductDto } from '../../repositories/ProductRepository/dto/addProductDto.js';
import { UpdateProductDto } from '../../repositories/ProductRepository/dto/updateProductDto.js';
import { Product } from '../../models/Product/Product.js';
import { Manufacturer } from '../../models/Manufacturer/Manufacturer.js';
import { Category } from '../../models/Category/Category.js';

describe('ProductService - Integration Tests', () => {
  let productService: ProductService;
  let productRepository: SeqProductRepository;
  let manufacturerRepository: SeqManufacturerRepository;
  let categoryRepository: SeqCategoryRepository;

  let testManufacturer: Manufacturer;
  let testCategory: Category;

  beforeAll(async () => {
    await setupTestDb();

    manufacturerRepository = new SeqManufacturerRepository();
    categoryRepository = new SeqCategoryRepository();
    productRepository = new SeqProductRepository();

    productService = new ProductService(
      productRepository,
      manufacturerRepository,
      categoryRepository,
    );

    // Создаем тестовые данные
    testManufacturer = await manufacturerRepository.addManuf(
      new Manufacturer(undefined, 'Test Manufacturer', 'Test Description'),
    );

    testCategory = await categoryRepository.addCategory(new Category(undefined, 'Test Category'));
  });

  afterEach(async () => {
    await clearTestDb();

    // Восстанавливаем тестовые данные после очистки
    testManufacturer = await manufacturerRepository.addManuf(
      new Manufacturer(undefined, 'Test Manufacturer', 'Test Description'),
    );

    testCategory = await categoryRepository.addCategory(new Category(undefined, 'Test Category'));
  });

  afterAll(async () => {
    await teardownTestDb();
  });

  describe('addProduct', () => {
    it('должен создать продукт в базе данных', async () => {
      const dto: AddProductDto = {
        name: 'Integration Test Product',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'This is a test product for integration testing',
        price: 150.75,
        availability: true,
        rating: 4.0,
      };

      const result = await productService.addProduct(dto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe('Integration Test Product');
      expect(result.price).toBe(150.75);
      expect(result.manufacturer.id).toBe(testManufacturer.id);
      expect(result.category.id).toBe(testCategory.id);
      expect(result.idProduct).toMatch(/^ART-/);
    });

    it('должен создать продукт с рейтингом по умолчанию 0', async () => {
      const dto: AddProductDto = {
        name: 'Product Without Rating',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'Product description for testing',
        price: 99.99,
        availability: true,
      };

      const result = await productService.addProduct(dto);

      expect(result.rating).toBe(0);
    });
  });

  describe('getAllProducts', () => {
    it('должен получить все продукты из базы данных', async () => {
      const dto1: AddProductDto = {
        name: 'Product 1',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'Description for product 1',
        price: 100.0,
        availability: true,
      };

      const dto2: AddProductDto = {
        name: 'Product 2',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'Description for product 2',
        price: 200.0,
        availability: true,
      };

      await productService.addProduct(dto1);
      await productService.addProduct(dto2);

      const products = await productService.getAllProducts();

      expect(products.length).toBeGreaterThanOrEqual(2);
      expect(products.some(p => p.name === 'Product 1')).toBe(true);
      expect(products.some(p => p.name === 'Product 2')).toBe(true);
    });
  });

  describe('getProductById', () => {
    it('должен получить продукт по ID из базы данных', async () => {
      const dto: AddProductDto = {
        name: 'Product to Find',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'Description for finding',
        price: 250.0,
        availability: true,
      };

      const createdProduct = await productService.addProduct(dto);
      const foundProduct = await productService.getProductById(createdProduct.id!);

      expect(foundProduct).not.toBeNull();
      expect(foundProduct?.id).toBe(createdProduct.id);
      expect(foundProduct?.name).toBe('Product to Find');
    });

    it('должен вернуть null для несуществующего ID', async () => {
      const result = await productService.getProductById('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('getProductByArticle', () => {
    it('должен получить продукт по артикулу из базы данных', async () => {
      const dto: AddProductDto = {
        name: 'Product by Article',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'Description for article test',
        price: 300.0,
        availability: true,
      };

      const createdProduct = await productService.addProduct(dto);
      const foundProduct = await productService.getProductByArticle(createdProduct.idProduct);

      expect(foundProduct).not.toBeNull();
      expect(foundProduct?.idProduct).toBe(createdProduct.idProduct);
      expect(foundProduct?.name).toBe('Product by Article');
    });
  });

  describe('updateProduct', () => {
    it('должен обновить продукт в базе данных', async () => {
      const dto: AddProductDto = {
        name: 'Product to Update',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'Original description',
        price: 100.0,
        availability: true,
      };

      const createdProduct = await productService.addProduct(dto);

      const updateDto: UpdateProductDto = {
        name: 'Updated Product Name',
        price: 150.0,
        description: 'Updated description',
      };

      const updatedProduct = await productService.updateProduct(createdProduct.id!, updateDto);

      expect(updatedProduct).not.toBeNull();
      expect(updatedProduct?.name).toBe('Updated Product Name');
      expect(updatedProduct?.price).toBe(150.0);
      expect(updatedProduct?.description).toBe('Updated description');
    });

    it('должен обновить только указанные поля', async () => {
      const dto: AddProductDto = {
        name: 'Partial Update Product',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'Original description',
        price: 100.0,
        availability: true,
        rating: 4.0,
      };

      const createdProduct = await productService.addProduct(dto);

      const updateDto: UpdateProductDto = {
        price: 200.0,
      };

      const updatedProduct = await productService.updateProduct(createdProduct.id!, updateDto);

      expect(updatedProduct?.price).toBe(200.0);
      expect(updatedProduct?.name).toBe('Partial Update Product');
      expect(updatedProduct?.description).toBe('Original description');
      expect(updatedProduct?.rating).toBe(4.0);
    });
  });

  describe('updateAvailability', () => {
    it('должен обновить доступность продукта в базе данных', async () => {
      const dto: AddProductDto = {
        name: 'Availability Test Product',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'Test description',
        price: 100.0,
        availability: true,
      };

      const createdProduct = await productService.addProduct(dto);
      expect(createdProduct.availability).toBe(true);

      const updatedProduct = await productService.updateAvailability(createdProduct.id!, false);

      expect(updatedProduct?.availability).toBe(false);
    });
  });

  describe('deleteProduct', () => {
    it('должен удалить продукт из базы данных', async () => {
      const dto: AddProductDto = {
        name: 'Product to Delete',
        manufacturerId: testManufacturer.id!,
        categoryId: testCategory.id!,
        description: 'Description for deletion',
        price: 100.0,
        availability: true,
      };

      const createdProduct = await productService.addProduct(dto);
      const deleteResult = await productService.deleteProduct(createdProduct.id!);

      expect(deleteResult).toBe(true);

      const foundProduct = await productService.getProductById(createdProduct.id!);
      expect(foundProduct).toBeNull();
    });

    it('должен вернуть false при попытке удалить несуществующий продукт', async () => {
      const result = await productService.deleteProduct('non-existent-id');

      expect(result).toBe(false);
    });
  });
});
