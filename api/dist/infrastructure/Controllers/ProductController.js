import { AddProductDto } from '../../core/repositories/ProductRepository/dto/addProductDto.js';
import { UpdateProductDto } from '../../core/repositories/ProductRepository/dto/updateProductDto.js';
import { ProductService } from '../../core/Service/ProductService.js';
export class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async addProduct(req, res) {
        const dto = req.body;
        const newProduct = await this.productService.addProduct(dto);
        res.status(201).json(newProduct);
    }
    async getProductById(req, res) {
        const { id } = req.params; // ?
        if (!id) {
            res.status(400).json({ message: 'Product not found' });
            return;
        }
        const foundProduct = await this.productService.getProductById(id);
        res.status(201).json(foundProduct);
    }
    async getProductByArticle(req, res) {
        const idProduct = req.body;
        if (idProduct) {
            res.status(400).json({ message: 'Product not found' });
            return;
        }
        const foundProduct = await this.productService.getProductByArticle(idProduct);
        res.status(200).json(foundProduct);
    }
    async updateProduct(req, res) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Product not found' });
            return;
        }
        const dto = req.body;
        const updatedProduct = await this.productService.updateProduct(id, dto);
        res.status(200).json(updatedProduct);
    }
    async deleteProduct(req, res) {
        const id = req.body;
        const success = await this.productService.deleteProduct(id);
        if (!success) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).json(success);
    }
}
//# sourceMappingURL=ProductController.js.map