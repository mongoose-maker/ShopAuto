import { Router } from 'express';
import { ProductController } from '../Controllers/ProductController.js';
import { validateDto } from '../Middleware/ValidateDto.js';
import { AddProductDto } from '../../core/repositories/ProductRepository/dto/addProductDto.js';
import { UpdateProductDto } from '../../core/repositories/ProductRepository/dto/updateProductDto.js';

export function createProductRouter(controller: ProductController): Router {
  const router = Router();

  router.post('/products', validateDto(AddProductDto), controller.addProduct.bind(controller));

  router.get('/products/:id', controller.getProductById.bind(controller));

  //router.get("/products", controller.getAllProduct.bind(controller));

  router.get('/categories/:articleId/products', controller.getProductByArticle.bind(controller));

  router.put(
    '/products/:id',
    validateDto(UpdateProductDto),
    controller.updateProduct.bind(controller),
  );

  router.delete('/products/:id', controller.deleteProduct.bind(controller));

  return router;
}
