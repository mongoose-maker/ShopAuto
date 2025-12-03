import type { Request, Response } from "express";
import { ManufacturerService } from "../../core/Service/ManufacturerService.js";
export declare class ManufacturerController {
    private readonly manufacturerService;
    constructor(manufacturerService: ManufacturerService);
    addManuf(req: Request, res: Response): Promise<void>;
    getManufById(req: Request, res: Response): Promise<void>;
    getAllManufacturer(req: Request, res: Response): Promise<void>;
    updateManufInfo(req: Request, res: Response): Promise<void>;
    updateListProductByManuf(req: Request, res: Response): Promise<void>;
    deleteManuf(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=ManufacturerController.d.ts.map