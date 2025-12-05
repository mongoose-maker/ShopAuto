import { ManufacturerService } from '../../core/Service/ManufacturerService.js';
import { AddManufacturerDto } from '../../core/repositories/ManufacturerRepository/dto/addManufacturerDto.js';
export class ManufacturerController {
    constructor(manufacturerService) {
        this.manufacturerService = manufacturerService;
    }
    async addManuf(req, res) {
        const dto = req.body;
        const newManuf = await this.manufacturerService.addManufacturer(dto);
        res.status(201).json(newManuf);
    }
    async getManufById(req, res) {
        const { id } = req.params; // ?
        if (!id) {
            res.status(400).json({ message: 'Manufacturer not found' });
            return;
        }
        const foundManufacturer = await this.manufacturerService.getManufacturerById(id);
        res.status(201).json(foundManufacturer);
    }
    async getAllManufacturer(_req, res) {
        const manufacturers = await this.manufacturerService.getAllManufacturers([]);
        res.status(200).json(manufacturers);
    }
    async updateManufInfo(req, res) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Manufacturer not found' });
            return;
        }
        const dto = req.body;
        const updatedInfoManuf = await this.manufacturerService.updateManufacturerInfo(id, dto);
        res.status(200).json(updatedInfoManuf);
    }
    async updateListProductByManuf(req, res) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Manufacturer not found' });
            return;
        }
        const dto = req.body;
        const updatedListProductByManuf = await this.manufacturerService.updateManufacturerProducts(id, dto);
        res.status(200).json(updatedListProductByManuf);
    }
    async deleteManuf(req, res) {
        const id = req.body;
        const success = await this.manufacturerService.deleteManufacturer(id);
        if (!success) {
            res.status(404).json({ message: 'Manuf not found' });
        }
        res.status(204).json(success);
    }
}
//# sourceMappingURL=ManufacturerController.js.map