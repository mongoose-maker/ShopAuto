import { Manufacturer } from '../../../../core/models/Manufacturer/Manufacturer.js';

import type { ManufacturerRepository } from '../../../../core/repositories/ManufacturerRepository/ManufacturerRepository.js';

import {
  ManufacturerMapper,
  type SeqManufacturerWithProducts,
} from '../../Mapper/MapperManufacturer.js';

import { SeqProduct, SeqManufacturer } from '../../Associations/associations.js';

export class SeqManufacturerRepository implements ManufacturerRepository {
  async addManuf(manufacturer: Manufacturer): Promise<Manufacturer> {
    const dataToCreate = ManufacturerMapper.toPersistence(manufacturer);
    const createdManuf = await SeqManufacturer.create(dataToCreate);
    const manufacturerWithProducts = await SeqManufacturer.findByPk(createdManuf.id, {
      include: ['products'],
    });
    if (!manufacturerWithProducts) {
      throw new Error('manufacturer not found after create');
    }
    return ManufacturerMapper.toDomain(
      manufacturerWithProducts.get({
        plain: true,
      }) as SeqManufacturerWithProducts,
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
      include: ['products'],
    });
    return manufacturers.map(manuf =>
      ManufacturerMapper.toDomain(manuf.get({ plain: true }) as SeqManufacturerWithProducts),
    );
  }

  async updateManufInfo(
    id: string,
    updates: {
      name?: string;
      descriptionManufacturer?: string;
    },
  ): Promise<Manufacturer | null> {
    const manufacturer = await SeqManufacturer.findByPk(id);
    if (!manufacturer) {
      return null;
    }
    const dataToUpdate: Partial<{
      name: string;
      descriptionManufacturer: string;
    }> = {};
    if (updates.name !== undefined) dataToUpdate.name = updates.name;
    if (updates.descriptionManufacturer !== undefined)
      dataToUpdate.descriptionManufacturer = updates.descriptionManufacturer;
    if (Object.keys(dataToUpdate).length === 0) {
      return ManufacturerMapper.toDomain(manufacturer.get({ plain: true }));
    }
    await manufacturer.update(dataToUpdate);
    return ManufacturerMapper.toDomain(manufacturer.get({ plain: true }));
  }

  async updateListProductByManuf(
    manufacturerId: string,
    productIds: string[],
  ): Promise<Manufacturer | null> {
    const foundManufacturer = await SeqManufacturer.findByPk(manufacturerId, {
      include: ['products'],
    });
    if (!foundManufacturer) {
      throw new Error(`Manufacturer with id ${manufacturerId} not found`);
    }
    if (productIds && productIds.length > 0) {
      const products = await SeqProduct.findAll({
        where: { id: productIds },
      });
      await foundManufacturer.setProducts(products);
    }
    const updatedManufacturer = await SeqManufacturer.findByPk(manufacturerId, {
      include: ['products'],
    });
    return updatedManufacturer
      ? ManufacturerMapper.toDomain(updatedManufacturer.get({ plain: true }))
      : null;
  }

  async deleteManuf(id: string): Promise<boolean> {
    const foundManufacturer = await SeqManufacturer.destroy({ where: { id } });
    return foundManufacturer > 0;
  }
}
