import { Manufacturer } from "../../models/Manufacturer/Manufacturer";
import { AddManufacturerDto } from "./dto/addManufacturerDto";
import { updateManufacturerDto } from "./dto/updateManufacturerDto";
export interface ManufacturerRepository {
    addManuf(dto: AddManufacturerDto): Manufacturer;
    getManufById(id: string): Manufacturer;
    getAllManuf(dto: AddManufacturerDto): Manufacturer;
    updateInfOfManuf(dto: updateManufacturerDto): Manufacturer;
    updateListProductByManuf(dto: updateManufacturerDto): Manufacturer;
    deleteManuf(id: string): Manufacturer;
}
//# sourceMappingURL=ManufacturerRepository.d.ts.map