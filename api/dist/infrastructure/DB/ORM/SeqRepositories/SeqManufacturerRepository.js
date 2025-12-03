import { Manufacturer } from '../../../../core/models/Manufacturer/Manufacturer.js';
import { ManufacturerMapper, } from '../../Mapper/MapperManufacturer.js';
import { SeqProduct, SeqManufacturer } from '../../Associations/associations.js';
export class SeqManufacturerRepository {
    async addManuf(manufacturer) {
        const dataToCreate = ManufacturerMapper.toPersistence(manufacturer);
        const createdManuf = await SeqManufacturer.create(dataToCreate);
        const manufacturerWithProducts = await SeqManufacturer.findByPk(createdManuf.id, {
            include: ['products'],
        });
        if (!manufacturerWithProducts) {
            throw new Error('manufacturer not found after create');
        }
        return ManufacturerMapper.toDomain(manufacturerWithProducts.get({
            plain: true,
        }));
    }
    async getManufById(id) {
        const foundManufacturer = await SeqManufacturer.findByPk(id, { raw: true });
        if (!foundManufacturer) {
            return null;
        }
        return ManufacturerMapper.toDomain(foundManufacturer.get({ plain: true }));
    }
    async getAllManuf() {
        const manufacturers = await SeqManufacturer.findAll({
            include: ['products'],
        });
        return manufacturers.map(manuf => ManufacturerMapper.toDomain(manuf.get({ plain: true })));
    }
    async updateManufInfo(id, updates) {
        const manufacturer = await SeqManufacturer.findByPk(id);
        if (!manufacturer) {
            return null;
        }
        const dataToUpdate = {};
        if (updates.name !== undefined)
            dataToUpdate.name = updates.name;
        if (updates.descriptionManufacturer !== undefined)
            dataToUpdate.descriptionManufacturer = updates.descriptionManufacturer;
        if (Object.keys(dataToUpdate).length === 0) {
            return ManufacturerMapper.toDomain(manufacturer.get({ plain: true }));
        }
        await manufacturer.update(dataToUpdate);
        return ManufacturerMapper.toDomain(manufacturer.get({ plain: true }));
    }
    async updateListProductByManuf(manufacturerId, productIds) {
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
    async deleteManuf(id) {
        const foundManufacturer = await SeqManufacturer.destroy({ where: { id } });
        return foundManufacturer > 0;
    }
}
//# sourceMappingURL=SeqManufacturerRepository.js.map