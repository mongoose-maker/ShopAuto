import { ManufacturerService } from '../../ManufacturerService.js';
import { SeqManufacturerRepository } from '../../../../infrastructure/DB/ORM/SeqRepositories/SeqManufacturerRepository.js';
import { setupTestDb, teardownTestDb, clearTestDb } from '../../../../__tests__/helpers/testDb.js';
import { AddManufacturerDto } from '../../../repositories/ManufacturerRepository/dto/addManufacturerDto.js';
import { UpdateManufacturerDto } from '../../../repositories/ManufacturerRepository/dto/updateManufacturerDto.js';
import { UpdateInfoManufacturerDto } from '../../../repositories/ManufacturerRepository/dto/updateInfoManufRepo.js';
describe('ManufacturerService - Integration Tests', () => {
    let manufacturerService;
    let manufacturerRepository;
    beforeAll(async () => {
        await setupTestDb();
        manufacturerRepository = new SeqManufacturerRepository();
        manufacturerService = new ManufacturerService(manufacturerRepository);
    });
    afterEach(async () => {
        await clearTestDb();
    });
    afterAll(async () => {
        await teardownTestDb();
    });
    describe('addManufacturer', () => {
        it('должен создать производителя', async () => {
            const dto = {
                name: 'BMW',
            };
            const result = await manufacturerService.addManufacturer(dto);
            expect(result).toBeDefined();
            expect(result.id).toBeDefined();
            expect(result.name).toBe('BMW');
            const foundManufacturer = await manufacturerRepository.getManufById(result.id);
            expect(foundManufacturer).not.toBeNull();
            expect(foundManufacturer?.name).toBe('BMW');
        });
        it('должен создать производителя с уникальным id', async () => {
            const dto1 = { name: 'Manuf-1' };
            const dto2 = { name: 'Manuf-2' };
            const manufacturer1 = await manufacturerService.addManufacturer(dto1);
            const manufacturer2 = await manufacturerService.addManufacturer(dto2);
            expect(manufacturer1.id).not.toBe(manufacturer2.id);
            expect(manufacturer1.id).toBeDefined();
            expect(manufacturer2.id).toBeDefined();
        });
    });
    describe('getAllManufacturers', () => {
        it('должен вернуть всех производителей', async () => {
            const dto1 = { name: 'Manuf-1' };
            const dto2 = { name: 'Manuf-2' };
            const dto3 = { name: 'Manuf-3' };
            await manufacturerService.addManufacturer(dto1);
            await manufacturerService.addManufacturer(dto2);
            await manufacturerService.addManufacturer(dto3);
            const result = await manufacturerService.getAllManufacturers([]);
            expect(result.length).toBeGreaterThanOrEqual(3);
            expect(result.some(m => m.name === 'Manuf-1')).toBe(true);
            expect(result.some(m => m.name === 'Manuf-2')).toBe(true);
            expect(result.some(m => m.name === 'Manuf-3')).toBe(true);
        });
        it('должен вернуть пустой массив если производителей нет', async () => {
            const manufacturers = await manufacturerService.getAllManufacturers([]);
            expect(manufacturers).toEqual([]);
            expect(manufacturers.length).toBe(0);
        });
    });
    describe('getManufacturerById', () => {
        it('должен получить производителя по ID из базы данных', async () => {
            const dto = {
                name: 'Manufacturer to Find',
            };
            const createdManufacturer = await manufacturerService.addManufacturer(dto);
            const foundManufacturer = await manufacturerService.getManufacturerById(createdManufacturer.id);
            expect(foundManufacturer).not.toBeNull();
            expect(foundManufacturer?.id).toBe(createdManufacturer.id);
            expect(foundManufacturer?.name).toBe('Manufacturer to Find');
        });
        it('должен вернуть null для несуществующего ID', async () => {
            const result = await manufacturerService.getManufacturerById('non-existent-id-12345');
            expect(result).toBeNull();
        });
    });
    describe('updateManufacturerInfo', () => {
        it('должен обновить производителя в базе данных', async () => {
            const dto = {
                name: 'Original Manufacturer Name',
            };
            const createdManufacturer = await manufacturerService.addManufacturer(dto);
            const updateDto = {
                name: 'Updated Manufacturer Name',
                descriptionManufacturer: 'Updated Description',
            };
            const updatedManufacturer = await manufacturerService.updateManufacturerInfo(createdManufacturer.id, updateDto);
            expect(updatedManufacturer).not.toBeNull();
            expect(updatedManufacturer?.id).toBe(createdManufacturer.id);
            expect(updatedManufacturer?.name).toBe('Updated Manufacturer Name');
            expect(updatedManufacturer?.descriptionManufacturer).toBe('Updated Description');
            const foundManufacturer = await manufacturerRepository.getManufById(createdManufacturer.id);
            expect(foundManufacturer?.name).toBe('Updated Manufacturer Name');
        });
        it('должен сохранить старое имя если новое не указано', async () => {
            const dto = { name: 'Original Name' };
            const createdManufacturer = await manufacturerService.addManufacturer(dto);
            const updateDto = {};
            const updatedManufacturer = await manufacturerService.updateManufacturerInfo(createdManufacturer.id, updateDto);
            expect(updatedManufacturer?.name).toBe('Original Name');
        });
        it('должен вернуть null при обновлении несуществующего производителя', async () => {
            const updateDto = {
                name: 'New Name',
            };
            const result = await manufacturerService.updateManufacturerInfo('non-existent-id', updateDto);
            expect(result).toBeNull();
        });
    });
    describe('updateManufacturerProducts', () => {
        it('должен обновить список продуктов производителя', async () => {
            const dto = { name: 'Test Manufacturer' };
            const createdManufacturer = await manufacturerService.addManufacturer(dto);
            const updateDto = {
                productsIds: ['product-id-1', 'product-id-2', 'product-id-3'],
            };
            const result = await manufacturerService.updateManufacturerProducts(createdManufacturer.id, updateDto);
            expect(result).not.toBeNull();
            expect(result?.id).toBe(createdManufacturer.id);
        });
    });
    describe('deleteManufacturer', () => {
        it('должен удалить производителя из базы данных', async () => {
            const dto = {
                name: 'Manufacturer to Delete',
            };
            const createdManufacturer = await manufacturerService.addManufacturer(dto);
            const deleteResult = await manufacturerService.deleteManufacturer(createdManufacturer.id);
            expect(deleteResult).toBe(true);
            const foundManufacturer = await manufacturerService.getManufacturerById(createdManufacturer.id);
            expect(foundManufacturer).toBeNull();
        });
        it('должен вернуть false при попытке удалить несуществующего производителя', async () => {
            const result = await manufacturerService.deleteManufacturer('non-existent-id');
            expect(result).toBe(false);
        });
    });
});
//# sourceMappingURL=Manufacturer.integration.test.js.map