import { Manufacturer } from "../../../../core/models/Manufacturer/Manufacturer.js";
import type { ManufacturerRepository } from "../../../../core/repositories/ManufacturerRepository/ManufacturerRepository.js";
export declare class SeqManufacturerRepository implements ManufacturerRepository {
    addManuf(manufacturer: Manufacturer): Promise<Manufacturer>;
    getManufById(id: string): Promise<Manufacturer | null>;
    getAllManuf(): Promise<Manufacturer[]>;
    updateManufInfo(id: string, updates: {
        name?: string;
        descriptionManufacturer?: string;
    }): Promise<Manufacturer | null>;
    updateListProductByManuf(manufacturerId: string, productIds: string[]): Promise<Manufacturer | null>;
    deleteManuf(id: string): Promise<boolean>;
}
//# sourceMappingURL=SeqManufacturerRepository.d.ts.map