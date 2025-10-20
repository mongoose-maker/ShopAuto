import type { Request, Response } from "express";
import { ManufacturerService } from "../../core/Service/ManufacturerService.js";
import { AddManufacturerDto } from "../../core/repositories/ManufacturerRepository/dto/addManufacturerDto.js";
import type { updateInfoManufacturerDto } from "../../core/repositories/ManufacturerRepository/dto/updateInfoManufRepo.js";
import type { updateManufacturerDto } from "../../core/repositories/ManufacturerRepository/dto/updateManufacturerDto.js";

export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}
  async addManuf(req: Request, res: Response): Promise<void> {
    const dto: AddManufacturerDto = req.body;
    const newManuf = await this.manufacturerService.addManuf(dto);
    res.status(201).json(newManuf);
  }

  async getManufById(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // ?
    if (!id) {
      res.status(400).json({ message: "Manufacturer not found" });
      return;
    }
    const foundManufacturer = await this.manufacturerService.getManufById(id);
    res.status(201).json(foundManufacturer);
  }

  async getAllManufacturer() {} //// ????????????????????????????? !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  async updateManufInfo(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Manufacturer not found" });
      return;
    }
    const dto: updateInfoManufacturerDto = req.body;
    const updatedInfoManuf = await this.manufacturerService.updateManufInfo(
      id,
      dto
    );
    res.status(200).json(updatedInfoManuf);
  }

  async updateListProductByManuf(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Manufacturer not found" });
      return;
    }
    const dto: updateManufacturerDto = req.body;
    const updatedListProductByManuf =
      await this.manufacturerService.updateListProductByManuf(id, dto);
    res.status(200).json(updatedListProductByManuf);
  }

  async deleteManuf(req: Request, res: Response): Promise<void> {
    const id: string = req.body;
    const success = await this.manufacturerService.deleteManuf(id);
    if (!success) {
      res.status(404).json({ message: "Manuf not found" });
    }
    res.status(204).json(success);
  }
}
