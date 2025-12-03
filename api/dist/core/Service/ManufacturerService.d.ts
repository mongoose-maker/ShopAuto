import { Manufacturer } from "../models/Manufacturer/Manufacturer.js";
import type { AddManufacturerDto } from "../repositories/ManufacturerRepository/dto/addManufacturerDto.js";
import type { UpdateInfoManufacturerDto } from "../repositories/ManufacturerRepository/dto/updateInfoManufRepo.js";
import type { UpdateManufacturerDto } from "../repositories/ManufacturerRepository/dto/updateManufacturerDto.js";
import type { ManufacturerRepository } from "../repositories/ManufacturerRepository/ManufacturerRepository.js";
export declare class ManufacturerService {
    private readonly manufacturerRepository;
    constructor(manufacturerRepository: ManufacturerRepository);
    addManufacturer(dto: AddManufacturerDto): Promise<Manufacturer>;
    getManufacturerById(id: string): Promise<Manufacturer | null>;
    getAllManufacturers(): Promise<Manufacturer[]>;
    updateManufacturerInfo(id: string, dto: UpdateInfoManufacturerDto): Promise<Manufacturer | null>;
    updateManufacturerProducts(id: string, dto: UpdateManufacturerDto): Promise<Manufacturer | null>;
    deleteManufacturer(id: string): Promise<boolean>;
}
//# sourceMappingURL=ManufacturerService.d.ts.map