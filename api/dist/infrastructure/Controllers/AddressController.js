import { AddressService } from '../../core/Service/AddressService.js';
import { AddAddressDto } from '../../core/repositories/AddressRepository/dto/addAddressDto.js';
import { UpdateAddressDto } from '../../core/repositories/AddressRepository/dto/updateAddressDto.js';
export class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async addAddress(req, res) {
        try {
            const dto = req.body;
            const newAddress = await this.addressService.addAddress(dto);
            res.status(201).json(newAddress);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getAddressById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'Address ID is required' });
                return;
            }
            const foundAddress = await this.addressService.getAddressById(id);
            if (!foundAddress) {
                res.status(404).json({ message: 'Address not found' });
                return;
            }
            res.status(200).json(foundAddress);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUserAddress(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }
            const foundAddress = await this.addressService.getUserAddress(userId);
            if (!foundAddress) {
                res.status(404).json({ message: 'Address not found for this user' });
                return;
            }
            res.status(200).json(foundAddress);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateAddress(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'Address ID is required' });
                return;
            }
            const dto = req.body;
            const updatedAddress = await this.addressService.updateAddress(id, dto);
            if (!updatedAddress) {
                res.status(404).json({ message: 'Address not found' });
                return;
            }
            res.status(200).json(updatedAddress);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async deleteAddress(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'Address ID is required' });
                return;
            }
            const success = await this.addressService.deleteAddress(id);
            if (!success) {
                res.status(404).json({ message: 'Address not found' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
//# sourceMappingURL=AddressController.js.map