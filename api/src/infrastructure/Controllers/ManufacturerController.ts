import { ManufacturerService } from "../../core/Service/ManufacturerService.js";
import type { Manufacturer } from "../../core/models/Manufacturer/Manufacturer.js";
import { AddManufacturerDto } from "../../core/repositories/ManufacturerRepository/dto/addManufacturerDto.js";
import type { updateInfoManufacturerDto } from "../../core/repositories/ManufacturerRepository/dto/updateInfoManufRepo.js";
import type { updateManufacturerDto } from "../../core/repositories/ManufacturerRepository/dto/updateManufacturerDto.js";

export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}
  async addManuf(dto: AddManufacturerDto): Promise<Manufacturer> {
    return await this.manufacturerService.addManuf(dto);
  }

  async getManufById(id: string): Promise<Manufacturer> {
    const foundManufacturer = await this.manufacturerService.getManufById(id);
    if (!foundManufacturer) {
      throw new Error("Manufacturer not found");
    }
    return foundManufacturer;
  }

  async getAllManufacturer(): Promise<Manufacturer[]> {
    return await this.manufacturerService.getAllManufacturer();
  }

  async updateManufInfo(
    id: string,
    dto: updateInfoManufacturerDto
  ): Promise<Manufacturer> {
    const existingManufacturer = await this.manufacturerService.updateManufInfo(
      id,
      dto
    );
    if (!existingManufacturer) {
      throw new Error("Manufacturer not found");
    }
    return existingManufacturer;
  }

  async updateListProductByManuf(
    id: string,
    dto: updateManufacturerDto
  ): Promise<Manufacturer> {
    const updatedListProductByManuf =
      await this.manufacturerService.updateListProductByManuf(id, dto);
    if (!updatedListProductByManuf) {
      throw new Error("Manufacturer not found");
    }
    return updatedListProductByManuf;
  }

  async deleteManuf(id: string): Promise<boolean> {
    const success = await this.manufacturerService.deleteManuf(id);
    if (!success) {
      throw new Error("couldn't complete the action");
    }
    return success;
  }
}
