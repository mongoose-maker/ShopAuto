import { Manufacturer } from "../../models/Manufacturer/Manufacturer.js";
import { UpdateManufacturerDto } from "./dto/updateManufacturerDto.js";
import { UpdateInfoManufacturerDto } from "./dto/updateInfoManufRepo.js";

export interface ManufacturerRepository {
  addManuf(manufacturer: Manufacturer): Promise<Manufacturer>;
  // нужно ли сюда добавлять метод addProductByManufacturer ?
  getManufById(id: string): Promise<Manufacturer | null>;
  getAllManuf(): Promise<Manufacturer[]>;
  updateManufInfo(
    id: string,
    updates: {
      name?: string;
      descriptionManufacturer?: string;
    }
  ): Promise<Manufacturer | null>;
  updateListProductByManuf(
    manufacturerId: string, // id: string
    productIds: string[] // UpdateManufacturerDto
  ): Promise<Manufacturer | null>;
  deleteManuf(id: string): Promise<boolean>;
}
