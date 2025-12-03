import { CartItemService } from "../../core/Service/CartItemService.js";
import { AddItemDto } from "../../core/repositories/CartItem/dto/addItemDto.js";
import { UpdateItemDto } from "../../core/repositories/CartItem/dto/updateItemDto.js";
export class CartItemController {
    constructor(cartItemService) {
        this.cartItemService = cartItemService;
    }
    async addItem(req, res) {
        try {
            const dto = req.body;
            const newItem = await this.cartItemService.addItem(dto);
            res.status(201).json(newItem);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateItem(req, res) {
        try {
            const { cartId, productId } = req.params;
            if (!cartId || !productId) {
                res.status(400).json({
                    message: "Cart ID and Product ID are required",
                });
                return;
            }
            const dto = req.body;
            const updatedItem = await this.cartItemService.updateItem(cartId, productId, dto);
            if (!updatedItem) {
                res.status(404).json({ message: "Cart item not found" });
                return;
            }
            res.status(200).json(updatedItem);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getItemList(req, res) {
        try {
            const { cartId } = req.params;
            if (!cartId) {
                res.status(400).json({ message: "Cart ID is required" });
                return;
            }
            const items = await this.cartItemService.getItemList(cartId);
            if (!items) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }
            res.status(200).json(items);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async removeItem(req, res) {
        try {
            const { cartId, productId } = req.params;
            if (!cartId || !productId) {
                res.status(400).json({
                    message: "Cart ID and Product ID are required",
                });
                return;
            }
            const success = await this.cartItemService.removeItem(cartId, productId);
            if (!success) {
                res.status(404).json({ message: "Cart item not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async clearCart(req, res) {
        try {
            const { cartId } = req.params;
            if (!cartId) {
                res.status(400).json({ message: "Cart ID is required" });
                return;
            }
            const success = await this.cartItemService.clearCart(cartId);
            if (!success) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
//# sourceMappingURL=CartItemController.js.map