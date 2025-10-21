import type { Request, Response } from "express";
import { AddProductDto } from "../../core/repositories/ProductRepository/dto/addProductDto.js";
import { UpdateProductDto } from "../../core/repositories/ProductRepository/dto/updateProductDto.js";
import { ProductService } from "../../core/Service/ProductService.js";

export class ProductController {
  constructor(private readonly productService: ProductService) {}
  async addProduct(req: Request, res: Response): Promise<void> {
    const dto: AddProductDto = req.body;
    const newProduct = await this.productService.addProduct(dto);
    res.status(201).json(newProduct);
  }

  async getAllProduct(req: Request, res: Response): Promise<void> {} //// ????????????????????????????? !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // ?
    if (!id) {
      res.status(400).json({ message: "Product not found" });
      return;
    }
    const foundProduct = await this.productService.getProductById(id);
    res.status(201).json(foundProduct);
  }

  async getProductByArticle(req: Request, res: Response): Promise<void> {
    const idProduct: string = req.body;
    if (idProduct) {
      res.status(400).json({ message: "Product not found" });
      return;
    }
    const foundProduct = await this.productService.getProductByArticle(
      idProduct
    );
    res.status(200).json(foundProduct);
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Product not found" });
      return;
    }
    const dto: UpdateProductDto = req.body;
    const updatedProduct = await this.productService.updateProduct(id, dto);
    res.status(200).json(updatedProduct);
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const id: string = req.body;
    const success = await this.productService.deleteProduct(id);
    if (!success) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(204).json(success);
  }
}
