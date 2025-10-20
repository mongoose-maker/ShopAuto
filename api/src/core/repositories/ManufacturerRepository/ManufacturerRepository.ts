import { Manufacturer } from "../../models/Manufacturer/Manufacturer.js";
import { updateManufacturerDto } from "./dto/updateManufacturerDto.js";
import { updateInfoManufacturerDto } from "./dto/updateInfoManufRepo.js";

export interface ManufacturerRepository {
  addManuf(manufacturer: Manufacturer): Promise<Manufacturer>;
  // нужно ли сюда добавлять метод addProductByManufacturer ?
  getManufById(id: string): Promise<Manufacturer | null>;
  getAllManuf(): Promise<Manufacturer[]>;
  updateManufInfo(
    id: string,
    dto: updateInfoManufacturerDto
  ): Promise<Manufacturer | null>;
  updateListProductByManuf(
    id: string,
    dto: updateManufacturerDto
  ): Promise<Manufacturer | null>;
  deleteManuf(id: string): Promise<boolean>;
}
