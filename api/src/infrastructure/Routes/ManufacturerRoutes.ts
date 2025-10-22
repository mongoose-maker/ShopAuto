import { Router, Request, Response } from "express";
import { ManufacturerController } from "../Controllers/ManufacturerController.js";
import { validateDto } from "./ValidationMiddleware.js"; // Middleware, который мы создали
import { AddManufacturerDto } from "../../core/repositories/ManufacturerRepository/dto/addManufacturerDto.js";
import { UpdateManufacturerDto } from "../../core/repositories/ManufacturerRepository/dto/updateManufacturerDto.js";

// Эта функция принимает "чистый" контроллер и создает из него роутер
export function createManufacturerRouter(
  controller: ManufacturerController
): Router {
  const router = Router();

  // --- POST /manufacturers ---
  router.post(
    "/manufacturers",
    validateDto(AddManufacturerDto), // 1. Валидация DTO
    async (req: Request, res: Response) => {
      try {
        // req.body - это УЖЕ провалидированный DTO из middleware
        const newManuf = await controller.addManuf(req.body);
        res.status(201).json(newManuf);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );

  // --- GET /manufacturers/:id ---
  router.get("/manufacturers/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const foundManuf = await controller.getManufById(id);
      res.status(200).json(foundManuf);
    } catch (error) {
      // Ловим ошибку, которую бросил контроллер
      if (error.message === "Manufacturer not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

  // --- GET /manufacturers ---
  router.get("/manufacturers", async (req: Request, res: Response) => {
    try {
      const allManuf = await controller.getAllManufacturer();
      res.status(200).json(allManuf);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // --- PUT /manufacturers/:id ---
  router.put(
    "/manufacturers/:id",
    validateDto(UpdateManufacturerDto), // (Тебе нужно создать этот DTO с валидаторами)
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const updatedManuf = await controller.updateManufInfo(id, req.body);
        res.status(200).json(updatedManuf);
      } catch (error) {
        if (error.message === "Manufacturer not found") {
          res.status(404).json({ message: error.message });
        } else {
          res.status(500).json({ message: error.message });
        }
      }
    }
  );

  return router;
}
