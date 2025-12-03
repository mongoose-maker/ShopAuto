import { Router } from 'express';
import { ManufacturerController } from '../Controllers/ManufacturerController.js';
import { AddManufacturerDto } from '../../core/repositories/ManufacturerRepository/dto/addManufacturerDto.js';
import { validateDto } from '../Middleware/ValidateDto.js';
import { UpdateManufacturerDto } from '../../core/repositories/ManufacturerRepository/dto/updateManufacturerDto.js';
import { UpdateInfoManufacturerDto } from '../../core/repositories/ManufacturerRepository/dto/updateInfoManufRepo.js';
export function createManufacturerRouter(controller) {
    const router = Router();
    router.post('/manufacturers', validateDto(AddManufacturerDto), controller.addManuf.bind(controller));
    router.get('/manufacturers/:id', controller.getManufById.bind(controller));
    router.get('/manufacturers', controller.getAllManufacturer.bind(controller));
    router.put('/manufacturers/:id', validateDto(UpdateInfoManufacturerDto), controller.updateManufInfo.bind(controller));
    router.patch('/manufacturers/:id', validateDto(UpdateInfoManufacturerDto), controller.updateManufInfo.bind(controller));
    router.put('/manufacturers/:id/products', validateDto(UpdateManufacturerDto), controller.updateListProductByManuf.bind(controller));
    router.delete('/manufacturers/:id', controller.deleteManuf.bind(controller));
    return router;
}
//# sourceMappingURL=ManufacturerRoutes.js.map