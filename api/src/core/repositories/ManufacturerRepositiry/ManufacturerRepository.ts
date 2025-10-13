import { Manufacturer } from "../../models/Manufacturer/Manufacturer.js";
import { AddManufacturerDto } from "./dto/addManufacturerDto.js";
import { updateManufacturerDto } from "./dto/updateManufacturerDto.js";

export interface ManufacturerRepository {
  addManuf(dto: AddManufacturerDto): Manufacturer;
  // нужно ли сюда добавлять метод addProductByManufacturer ?
  getManufById(id: string): Manufacturer;
  getAllManuf(dto: AddManufacturerDto): Manufacturer;
  updateInfOfManuf(dto: updateManufacturerDto): Manufacturer;
  updateListProductByManuf(dto: updateManufacturerDto): Manufacturer;
  deleteManuf(id: string): Manufacturer;
}
