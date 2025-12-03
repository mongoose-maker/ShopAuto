import type { Request, Response } from 'express';
import { AddressService } from '../../core/Service/AddressService.js';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    addAddress(req: Request, res: Response): Promise<void>;
    getAddressById(req: Request, res: Response): Promise<void>;
    getUserAddress(req: Request, res: Response): Promise<void>;
    updateAddress(req: Request, res: Response): Promise<void>;
    deleteAddress(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=AddressController.d.ts.map