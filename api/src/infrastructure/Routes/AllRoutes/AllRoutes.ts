import { Router } from 'express';
import { ProductController } from '../../Controllers/ProductController.js';
import { UserController } from '../../Controllers/UserController.js';
import { CategoryController } from '../../Controllers/CategoryController.js';
import { ManufacturerController } from '../../Controllers/ManufacturerController.js';
import { AddressController } from '../../Controllers/AddressController.js';
import { OrderController } from '../../Controllers/OrderController.js';
import { OrderItemController } from '../../Controllers/OrderItemController.js';
import { CartController } from '../../Controllers/CartController.js';
import { CartItemController } from '../../Controllers/CartItemController.js';

import { createProductRouter } from '../ProductRoutes.js';
import { createUserRouter } from '../UserRoutes.js';
import { createCategoryRouter } from '../CategoryRoutes.js';
import { createManufacturerRouter } from '../ManufacturerRoutes.js';
import { createAddressRouter } from '../AddressRoutes.js';
import { createOrderRouter } from '../OrderRoutes.js';
import { createOrderItemRouter } from '../OrderItemRotes.js';
import { createCartRouter } from '../CartRoutes.js';
import { createCartItemRouter } from '../CartItemRoutes.js';

export interface AppControllers {
  productController: ProductController;
  userController: UserController;
  categoryController: CategoryController;
  manufacturerController: ManufacturerController;
  addressController: AddressController;
  orderController: OrderController;
  orderItemController: OrderItemController;
  cartController: CartController;
  cartItemController: CartItemController;
}

export function registerAllRoutes(controllers: AppControllers): Router {
  const mainRouter = Router();

  // Product routes
  mainRouter.use('/api', createProductRouter(controllers.productController));

  // User routes
  mainRouter.use('/api', createUserRouter(controllers.userController));

  // Category routes
  mainRouter.use('/api', createCategoryRouter(controllers.categoryController));

  // Manufacturer routes
  mainRouter.use('/api', createManufacturerRouter(controllers.manufacturerController));

  // Address routes
  mainRouter.use('/api', createAddressRouter(controllers.addressController));

  // Order routes
  mainRouter.use('/api', createOrderRouter(controllers.orderController));

  // OrderItem routes
  mainRouter.use('/api', createOrderItemRouter(controllers.orderItemController));

  // Cart routes
  mainRouter.use('/api', createCartRouter(controllers.cartController));

  // CartItem routes
  mainRouter.use('/api', createCartItemRouter(controllers.cartItemController));

  return mainRouter;
}

// Экспортируем все функции создания роутеров для возможного индивидуального использования
export {
  createProductRouter,
  createUserRouter,
  createCategoryRouter,
  createManufacturerRouter,
  createAddressRouter,
  createOrderRouter,
  createOrderItemRouter,
  createCartRouter,
  createCartItemRouter,
};
