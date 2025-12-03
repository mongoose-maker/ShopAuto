import { Manufacturer } from '../../models/Manufacturer/Manufacturer.js';
export interface ManufacturerRepository {
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
//# sourceMappingURL=ManufacturerRepository.d.ts.map