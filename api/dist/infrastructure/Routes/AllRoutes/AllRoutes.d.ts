import { Router } from "express";
import { ProductController } from "../../Controllers/ProductController.js";
import { UserController } from "../../Controllers/UserController.js";
import { CategoryController } from "../../Controllers/CategoryController.js";
import { ManufacturerController } from "../../Controllers/ManufacturerController.js";
import { AddressController } from "../../Controllers/AddressController.js";
import { OrderController } from "../../Controllers/OrderController.js";
import { OrderItemController } from "../../Controllers/OrderItemController.js";
import { CartController } from "../../Controllers/CartController.js";
import { CartItemController } from "../../Controllers/CartItemController.js";
import { createProductRouter } from "../ProductRoutes.js";
import { createUserRouter } from "../UserRoutes.js";
import { createCategoryRouter } from "../CategoryRoutes.js";
import { createManufacturerRouter } from "../ManufacturerRoutes.js";
import { createAddressRouter } from "../AddressRoutes.js";
import { createOrderRouter } from "../OrderRoutes.js";
import { createOrderItemRouter } from "../OrderItemRotes.js";
import { createCartRouter } from "../CartRoutes.js";
import { createCartItemRouter } from "../CartItemRoutes.js";
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
export declare function registerAllRoutes(controllers: AppControllers): Router;
export { createProductRouter, createUserRouter, createCategoryRouter, createManufacturerRouter, createAddressRouter, createOrderRouter, createOrderItemRouter, createCartRouter, createCartItemRouter, };
//# sourceMappingURL=AllRoutes.d.ts.map