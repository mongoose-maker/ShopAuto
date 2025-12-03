import type { Request, Response } from "express";

import { CategoryService } from "../../core/Service/CategoryService.js";

import { AddCategoryDto } from "../../core/repositories/CategoryRepository/dto/addCategoryDto.js";
import { UpdateCategoryDto } from "../../core/repositories/CategoryRepository/dto/updateCategoryDto.js";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  async addCategory(req: Request, res: Response): Promise<void> {
    const dto: AddCategoryDto = req.body;
    const newCat = await this.categoryService.addCategory(dto);
    res.status(201).json(newCat);
  }

  async getAllCategory(req: Request, res: Response): Promise<void> {
    const allCategories = await this.categoryService.getAllCategories();
    res.status(201).json(allCategories);
  }

  async getCategoryById(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // ?
    if (!id) {
      res.status(400).json({ message: "Category not found" });
      return;
    }
    const foundCategory = await this.categoryService.getCategoryById(id);
    res.status(201).json(foundCategory);
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Manufacturer not found" });
      return;
    }
    const dto: UpdateCategoryDto = req.body;
    const updatedCategory = await this.categoryService.updateCategory(id, dto);
    res.status(200).json(updatedCategory);
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const id: string = req.body;
    const success = await this.categoryService.deleteCategory(id);
    if (!success) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(204).json(success);
  }
}
