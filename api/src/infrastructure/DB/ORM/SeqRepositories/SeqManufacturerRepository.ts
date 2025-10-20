import { Manufacturer } from "../../../../core/models/Manufacturer/Manufacturer.js";
import type { updateInfoManufacturerDto } from "../../../../core/repositories/ManufacturerRepository/dto/updateInfoManufRepo.js";

import { updateManufacturerDto } from "../../../../core/repositories/ManufacturerRepository/dto/updateManufacturerDto.js";
import type { ManufacturerRepository } from "../../../../core/repositories/ManufacturerRepository/ManufacturerRepository.js";

import {
  ManufacturerMapper,
  type SeqManufacturerWithProducts,
} from "../../Mapper/MapperManufacturer.js";

import SeqManufacturer from "../SeqModel/SeqManufacturerModel.js";

export class SeqManufacturerRepository implements ManufacturerRepository {
  async addManuf(manufacturer: Manufacturer): Promise<Manufacturer> {
    const dataToCreate = ManufacturerMapper.toPersistence(manufacturer);
    const createdManuf = await SeqManufacturer.create(dataToCreate);
    const manufacturerWithProducts = await SeqManufacturer.findByPk(
      createdManuf.id,
      {
        include: ["products"],
      }
    );
    if (!manufacturerWithProducts) {
      throw new Error("manufacturer not found after create");
    }
    return ManufacturerMapper.toDomain(
      manufacturerWithProducts.get({
        plain: true,
      }) as SeqManufacturerWithProducts
    );
  }
  async getManufById(id: string): Promise<Manufacturer | null> {
    const foundManufacturer = await SeqManufacturer.findByPk(id, { raw: true });
    if (!foundManufacturer) {
      return null;
    }
    return ManufacturerMapper.toDomain(foundManufacturer.get({ plain: true }));
  }
  async getAllManuf(): Promise<Manufacturer[]> {
    const manufacturers = await SeqManufacturer.findAll({
      include: ["products"],
    });
    return manufacturers.map((manuf) =>
      ManufacturerMapper.toDomain(
        manuf.get({ plain: true }) as SeqManufacturerWithProducts
      )
    );
  }
  async updateManufInfo(
    id: string,
    dto: updateInfoManufacturerDto ///
  ): Promise<Manufacturer | null> {
    const foundManufacturer = await SeqManufacturer.findByPk(id);
    if (!foundManufacturer) {
      return null;
    }
    await foundManufacturer.update({
      name: dto.name ?? foundManufacturer.name,
      descriptionManufacturer:
        dto.descriptionManufacturer ??
        foundManufacturer.descriptionManufacturer,
    });

    const updateInfoManuf = await foundManufacturer.update(dto);
    return updateInfoManuf
      ? ManufacturerMapper.toDomain(updateInfoManuf.get({ plain: true }))
      : null;
  }
  async updateListProductByManuf(
    id: string,
    dto: updateManufacturerDto
  ): Promise<Manufacturer | null> {
    const foundManufacturer = await SeqManufacturer.findByPk(id, {
      include: ["products"],
    });
    if (!foundManufacturer) {
      return null;
    }
    const updatedManufacturer = await foundManufacturer.update(dto);
    return ManufacturerMapper.toDomain(
      updatedManufacturer.get({ plain: true })
    );
  }
  async deleteManuf(id: string): Promise<boolean> {
    const foundManufacturer = await SeqManufacturer.destroy({ where: { id } });
    return foundManufacturer > 0;
  }
}
