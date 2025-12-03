import { Manufacturer } from "../models/Manufacturer/Manufacturer.js";
export class ManufacturerService {
    constructor(manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }
    async addManufacturer(dto) {
        // ✅ Исправил название
        const manufacturerToAdd = new Manufacturer(undefined, dto.name, dto.descriptionManufacturer);
        return await this.manufacturerRepository.addManuf(manufacturerToAdd);
    }
    async getManufacturerById(id) {
        // ✅ Исправил название
        return await this.manufacturerRepository.getManufById(id);
    }
    async getAllManufacturers() {
        // ✅ Исправил название
        return await this.manufacturerRepository.getAllManuf();
    }
    async updateManufacturerInfo(id, dto) {
        if (!id) {
            throw new Error("Manufacturer ID is required");
        }
        const updates = {};
        if (dto.name !== undefined)
            updates.name = dto.name;
        if (dto.descriptionManufacturer !== undefined) {
            updates.descriptionManufacturer = dto.descriptionManufacturer;
        }
        return await this.manufacturerRepository.updateManufInfo(id, updates);
    }
    async updateManufacturerProducts(id, dto) {
        if (!id) {
            throw new Error("Manufacturer ID is required");
        }
        const productIdsToUpdate = dto.productsIds || [];
        // ✅ Бизнес-валидация
        if (productIdsToUpdate.length > 100) {
            throw new Error("Manufacturer cannot have more than 100 products");
        }
        return await this.manufacturerRepository.updateListProductByManuf(id, productIdsToUpdate);
    }
    async deleteManufacturer(id) {
        // ✅ Исправил название
        return await this.manufacturerRepository.deleteManuf(id);
    }
}
//# sourceMappingURL=ManufacturerService.js.map