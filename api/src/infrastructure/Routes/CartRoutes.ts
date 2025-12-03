import { Router } from 'express';
import { CartController } from '../Controllers/CartController.js';
import { validateDto } from '../Middleware/ValidateDto.js';
import { AddCartDto } from '../../core/repositories/CartRepository/dto/addCartDto.js';
import { UpdateCartDto } from '../../core/repositories/CartRepository/dto/updateCartDto.js';

export function createCartRouter(controller: CartController): Router {
  const router = Router();

  router.post('/carts', validateDto(AddCartDto), controller.addItemToCart.bind(controller));

  router.get('/users/:userId/cart', controller.getCartByUserId.bind(controller));

  router.put(
    '/carts/:id',
    validateDto(UpdateCartDto),
    controller.updateItemInCart.bind(controller),
  );

  router.patch('/carts/:id/clear', controller.clearCart.bind(controller));

  router.delete('/carts/:id', controller.removeItemFromCart.bind(controller));

  return router;
}
