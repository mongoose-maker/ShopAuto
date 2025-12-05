import express from 'express';
import { setupTestDb, teardownTestDb } from './testDb.js';
import { registerAllRoutes } from '../../infrastructure/Routes/AllRoutes/AllRoutes.js';
import { errorHandler } from '../../infrastructure/Middleware/ErrorHandler.js';
import '../../infrastructure/DB/Associations/associations.js';
import { ProductController } from '../../infrastructure/Controllers/ProductController.js';
import { UserController } from '../../infrastructure/Controllers/UserController.js';
import { CategoryController } from '../../infrastructure/Controllers/CategoryController.js';
import { ManufacturerController } from '../../infrastructure/Controllers/ManufacturerController.js';
import { AddressController } from '../../infrastructure/Controllers/AddressController.js';
import { OrderController } from '../../infrastructure/Controllers/OrderController.js';
import { OrderItemController } from '../../infrastructure/Controllers/OrderItemController.js';
import { CartController } from '../../infrastructure/Controllers/CartController.js';
import { CartItemController } from '../../infrastructure/Controllers/CartItemController.js';
import { ProductService } from '../../core/Service/ProductService.js';
import { UserService } from '../../core/Service/UserService.js';
import { CategoryService } from '../../core/Service/CategoryService.js';
import { ManufacturerService } from '../../core/Service/ManufacturerService.js';
import { AddressService } from '../../core/Service/AddressService.js';
import { OrderService } from '../../core/Service/OrderService.js';
import { OrderItemService } from '../../core/Service/OrderItemService.js';
import { CartService } from '../../core/Service/CartService.js';
import { CartItemService } from '../../core/Service/CartItemService.js';
import { SeqProductRepository } from '../../infrastructure/DB/ORM/SeqRepositories/seqProductRepository.js';
import { SeqUserRepository } from '../../infrastructure/DB/ORM/SeqRepositories/SeqUserRepository.js';
import { SeqCategoryRepository } from '../../infrastructure/DB/ORM/SeqRepositories/SeqCategoryRepository.js';
import { SeqManufacturerRepository } from '../../infrastructure/DB/ORM/SeqRepositories/SeqManufacturerRepository.js';
import { SeqAddressRepository } from '../../infrastructure/DB/ORM/SeqRepositories/SeqAddressRepository.js';
import { SeqOrderRepository } from '../../infrastructure/DB/ORM/SeqRepositories/SeqOrderRepository.js';
import { SeqOrderItemRepository } from '../../infrastructure/DB/ORM/SeqRepositories/SeqOrderItemRepository.js';
import { SeqCartRepository } from '../../infrastructure/DB/ORM/SeqRepositories/SeqCartRepository.js';
import { SeqCartItemRepository } from '../../infrastructure/DB/ORM/SeqRepositories/SeqCartItemRepository.js';
let testApp = null;
export async function createTestApp() {
    if (testApp) {
        return testApp;
    }
    await setupTestDb();
    const app = express();
    app.use(express.json());
    // Инициализация репозиториев
    const productRepository = new SeqProductRepository();
    const userRepository = new SeqUserRepository();
    const categoryRepository = new SeqCategoryRepository();
    const manufacturerRepository = new SeqManufacturerRepository();
    const addressRepository = new SeqAddressRepository();
    const orderRepository = new SeqOrderRepository();
    const orderItemRepository = new SeqOrderItemRepository();
    const cartRepository = new SeqCartRepository();
    const cartItemRepository = new SeqCartItemRepository();
    // Инициализация сервисов
    const productService = new ProductService(productRepository, manufacturerRepository, categoryRepository);
    const userService = new UserService(userRepository);
    const categoryService = new CategoryService(categoryRepository);
    const manufacturerService = new ManufacturerService(manufacturerRepository);
    const addressService = new AddressService(addressRepository);
    const orderService = new OrderService(orderRepository, productRepository, cartRepository);
    const orderItemService = new OrderItemService(orderItemRepository, productRepository, orderRepository);
    const cartService = new CartService(cartRepository, productRepository);
    const cartItemService = new CartItemService(cartItemRepository, productRepository);
    // Инициализация контроллеров
    const productController = new ProductController(productService);
    const userController = new UserController(userService);
    const categoryController = new CategoryController(categoryService);
    const manufacturerController = new ManufacturerController(manufacturerService);
    const addressController = new AddressController(addressService);
    const orderController = new OrderController(orderService);
    const orderItemController = new OrderItemController(orderItemService);
    const cartController = new CartController(cartService);
    const cartItemController = new CartItemController(cartItemService);
    // Регистрация роутов
    app.use('/api', registerAllRoutes({
        productController,
        userController,
        categoryController,
        manufacturerController,
        addressController,
        orderController,
        orderItemController,
        cartController,
        cartItemController,
    }));
    app.use(errorHandler);
    testApp = app;
    return app;
}
export async function closeTestApp() {
    await teardownTestDb();
    testApp = null;
}
//# sourceMappingURL=testApp.js.map