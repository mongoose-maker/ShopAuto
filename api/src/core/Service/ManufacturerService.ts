import { Manufacturer } from "../models/Manufacturer/Manufacturer.js";

import type { AddManufacturerDto } from "../repositories/ManufacturerRepository/dto/addManufacturerDto.js";
import { updateInfoManufacturerDto } from "../repositories/ManufacturerRepository/dto/updateInfoManufRepo.js";
import type { updateManufacturerDto } from "../repositories/ManufacturerRepository/dto/updateManufacturerDto.js";
import type { ManufacturerRepository } from "../repositories/ManufacturerRepository/ManufacturerRepository.js";

export class ManufacturerService {
  constructor(readonly manufacturerRepository: ManufacturerRepository) {}
  async addManuf(dto: AddManufacturerDto): Promise<Manufacturer> {
    const manufacturerToAdd = new Manufacturer(
      undefined,
      dto.name,
      dto.descriptionManufacturer,
      dto.products ?? []
    );
    const createdManuf = await this.manufacturerRepository.addManuf(
      manufacturerToAdd
    );
    return createdManuf;
  }
  async getManufById(id: string): Promise<Manufacturer | null> {
    const foundManufacturer = await this.manufacturerRepository.getManufById(
      id
    );
    return foundManufacturer;
  }

  async getAllManufacturer(): Promise<Manufacturer[]> {
    const manufacturers = await this.manufacturerRepository.getAllManuf();
    return manufacturers;
  }

  async updateManufInfo(
    id: string,
    dto: updateInfoManufacturerDto
  ): Promise<Manufacturer | null> {
    const existingManufacturer = await this.manufacturerRepository.getManufById(
      id
    );
    if (!existingManufacturer) {
      throw new Error(`Manufacturer with id ${id} not found`);
    }
    const updatedInfoManuf = new Manufacturer(
      existingManufacturer.id,
      dto.name ?? existingManufacturer.name,
      dto.descriptionManufacturer ??
        existingManufacturer.descriptionManufacturer
    );
    return await this.manufacturerRepository.updateManufInfo(
      id,
      updatedInfoManuf
    );
  }

  async updateListProductByManuf(
    id: string,
    dto: updateManufacturerDto
  ): Promise<Manufacturer | null> {
    const existingManufacturer = await this.manufacturerRepository.getManufById(
      id
    );
    if (!existingManufacturer) {
      throw new Error(`Manufacturer with id ${id} not found`);
    }
    const updatedManuf = new Manufacturer(
      existingManufacturer.id,
      dto.name ?? existingManufacturer.name,
      dto.descriptionManufacturer ??
        existingManufacturer.descriptionManufacturer,
      dto.products ?? existingManufacturer.products
    );
    return await this.manufacturerRepository.updateListProductByManuf(
      id,
      updatedManuf
    );
  }

  async deleteManuf(id: string): Promise<boolean> {
    return await this.manufacturerRepository.deleteManuf(id);
  }
}
