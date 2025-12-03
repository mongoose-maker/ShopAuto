import { Router } from "express";
import { AddressController } from "../Controllers/AddressController.js";
import { validateDto } from "../Middleware/ValidateDto.js";
import { AddAddressDto } from "../../core/repositories/AddressRepository/dto/addAddressDto.js";
import { UpdateAddressDto } from "../../core/repositories/AddressRepository/dto/updateAddressDto.js";
export function createAddressRouter(controller) {
    const router = Router();
    router.post("/addresses", validateDto(AddAddressDto), controller.addAddress.bind(controller));
    router.get("/addresses/:id", controller.getAddressById.bind(controller));
    router.get("/users/:userId/", controller.getUserAddress.bind(controller));
    router.put("/addresses/:id", validateDto(UpdateAddressDto), controller.updateAddress.bind(controller));
    router.patch("/addresses/:id", validateDto(UpdateAddressDto), controller.updateAddress.bind(controller));
    router.delete("/addresses/:id", controller.deleteAddress.bind(controller));
    return router;
}
//# sourceMappingURL=AddressRoutes.js.map