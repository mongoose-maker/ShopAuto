import { Router } from "express";
import { validateDto } from "../Middleware/ValidateDto.js";
import { AddCategoryDto } from "../../core/repositories/CategoryRepository/dto/addCategoryDto.js";
import { UpdateCategoryDto } from "../../core/repositories/CategoryRepository/dto/updateCategoryDto.js";
export function createCategoryRouter(controller) {
    const router = Router();
    router.post("/category", validateDto(AddCategoryDto), controller.addCategory.bind(controller));
    router.get("/categories", controller.getAllCategory.bind(controller));
    router.get("/categories/:id", controller.getCategoryById.bind(controller));
    router.put("/categories/:id", validateDto(UpdateCategoryDto), controller.updateCategory.bind(controller));
    router.delete("/categories/:id", controller.deleteCategory.bind(controller));
    return router;
}
//# sourceMappingURL=CategoryRoutes.js.map