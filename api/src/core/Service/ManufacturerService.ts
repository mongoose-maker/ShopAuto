import { Manufacturer } from '../models/Manufacturer/Manufacturer.js';
import type { AddManufacturerDto } from '../repositories/ManufacturerRepository/dto/addManufacturerDto.js';
import type { UpdateInfoManufacturerDto } from '../repositories/ManufacturerRepository/dto/updateInfoManufRepo.js';
import type { UpdateManufacturerDto } from '../repositories/ManufacturerRepository/dto/updateManufacturerDto.js';
import type { ManufacturerRepository } from '../repositories/ManufacturerRepository/ManufacturerRepository.js';

export class ManufacturerService {
  constructor(private readonly manufacturerRepository: ManufacturerRepository) {}

  async addManufacturer(dto: AddManufacturerDto): Promise<Manufacturer> {
    const manufacturerToAdd = new Manufacturer(undefined, dto.name, dto.descriptionManufacturer);
    return await this.manufacturerRepository.addManuf(manufacturerToAdd);
  }

  async getManufacturerById(id: string): Promise<Manufacturer | null> {
    return await this.manufacturerRepository.getManufById(id);
  }

  async getAllManufacturers(p0: never[]): Promise<Manufacturer[]> {
    return await this.manufacturerRepository.getAllManuf();
  }

  async updateManufacturerInfo(
    id: string,
    dto: UpdateInfoManufacturerDto,
  ): Promise<Manufacturer | null> {
    if (!id) {
      throw new Error('Manufacturer ID is required');
    }

    const updates: { name?: string; descriptionManufacturer?: string } = {};
    if (dto.name !== undefined) updates.name = dto.name;
    if (dto.descriptionManufacturer !== undefined) {
      updates.descriptionManufacturer = dto.descriptionManufacturer;
    }

    return await this.manufacturerRepository.updateManufInfo(id, updates);
  }

  async updateManufacturerProducts(
    id: string,
    dto: UpdateManufacturerDto,
  ): Promise<Manufacturer | null> {
    if (!id) {
      throw new Error('Manufacturer ID is required');
    }

    const productIdsToUpdate = dto.productsIds || [];

    if (productIdsToUpdate.length > 100) {
      throw new Error('Manufacturer cannot have more than 100 products');
    }

    return await this.manufacturerRepository.updateListProductByManuf(id, productIdsToUpdate);
  }

  async deleteManufacturer(id: string): Promise<boolean> {
    return await this.manufacturerRepository.deleteManuf(id);
  }
}
