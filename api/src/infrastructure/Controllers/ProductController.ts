import type { Request, Response } from "express";
import { AddProductDto } from "../../core/repositories/ProductRepository/dto/addProductDto.js";
import { ProductService } from "../../core/Service/ProductService.js";

export class ProductController {
  constructor(private readonly productService: ProductService) {}
  async addProduct(req: Request, res: Response): Promise<void> {
    const dto: AddProductDto = req.body;
    const newProduct = await this.productService.addProduct(dto);
    res.status(201).json(newProduct);
  }
}
