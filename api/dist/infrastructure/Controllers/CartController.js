import { CartService } from '../../core/Service/CartService.js';
export class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getCartByUserId(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }
            const cart = await this.cartService.getCartByUserId(userId);
            if (!cart) {
                res.status(404).json({ message: 'Cart not found' });
                return;
            }
            res.status(200).json(cart);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async addItemToCart(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }
            const { productId, quantity } = req.body;
            if (!productId || !quantity) {
                res.status(400).json({
                    message: 'Product ID and quantity are required',
                });
                return;
            }
            const cart = await this.cartService.addItemToCart(userId, productId, quantity);
            res.status(200).json(cart);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateItemInCart(req, res) {
        try {
            const { userId, itemId } = req.params;
            if (!userId || !itemId) {
                res.status(400).json({
                    message: 'User ID and Item ID are required',
                });
                return;
            }
            const { quantity } = req.body;
            if (!quantity) {
                res.status(400).json({ message: 'Quantity is required' });
                return;
            }
            const cart = await this.cartService.updateItemInCart(userId, itemId, quantity);
            res.status(200).json(cart);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async removeItemFromCart(req, res) {
        try {
            const { userId, itemId } = req.params;
            if (!userId || !itemId) {
                res.status(400).json({
                    message: 'User ID and Item ID are required',
                });
                return;
            }
            const cart = await this.cartService.removeItemFromCart(userId, itemId);
            res.status(200).json(cart);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async clearCart(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }
            await this.cartService.clearCart(userId);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
//# sourceMappingURL=CartController.js.map