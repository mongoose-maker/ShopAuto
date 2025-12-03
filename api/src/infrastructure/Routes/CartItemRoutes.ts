import { Router } from 'express';
import { CartItemController } from '../Controllers/CartItemController.js';
import { validateDto } from '../Middleware/ValidateDto.js';
import { AddItemDto } from '../../core/repositories/CartItem/dto/addItemDto.js';
import { UpdateItemDto } from '../../core/repositories/CartItem/dto/updateItemDto.js';

export function createCartItemRouter(controller: CartItemController): Router {
  const router = Router();

  router.post('/cart-items', validateDto(AddItemDto), controller.addItem.bind(controller));

  router.get('/cart-items', controller.getItemList.bind(controller));

  router.put('/cart-items/:id', validateDto(UpdateItemDto), controller.updateItem.bind(controller));

  router.patch('/cart-items/:id/quantity', controller.clearCart.bind(controller));

  router.delete('/cart-items/:id', controller.removeItem.bind(controller));

  return router;
}
