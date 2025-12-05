import { ManufacturerService } from '../../ManufacturerService.js';
import type { ManufacturerRepository } from '../../../repositories/ManufacturerRepository/ManufacturerRepository.js';
import { Manufacturer } from '../../../models/Manufacturer/Manufacturer.js';
import { AddManufacturerDto } from '../../../repositories/ManufacturerRepository/dto/addManufacturerDto.js';
import { UpdateManufacturerDto } from '../../../repositories/ManufacturerRepository/dto/updateManufacturerDto.js';
import { UpdateInfoManufacturerDto } from '../../../repositories/ManufacturerRepository/dto/updateInfoManufRepo.js';

describe('ManufacturerService - Unit Tests', () => {
  let manufacturerService: ManufacturerService;
  let mockManufacturerRepository: jest.Mocked<ManufacturerRepository>;

  const mockManufacturer = new Manufacturer(
    'manufacturer-id-1',
    'Test Manufacturer',
    'Test Description',
  );

  beforeEach(() => {
    mockManufacturerRepository = {
      addManuf: jest.fn(),
      getManufById: jest.fn(),
      getAllManuf: jest.fn(),
      updateManufInfo: jest.fn(),
      updateListProductByManuf: jest.fn(),
      deleteManuf: jest.fn(),
    } as unknown as jest.Mocked<ManufacturerRepository>;

    manufacturerService = new ManufacturerService(mockManufacturerRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addManufacturer', () => {
    it('должен создать производителя с валидными данными', async () => {
      const dto: AddManufacturerDto = {
        name: 'Test Manufacturer',
      };

      mockManufacturerRepository.addManuf.mockResolvedValue(mockManufacturer);

      const result = await manufacturerService.addManufacturer(dto);

      expect(mockManufacturerRepository.addManuf).toHaveBeenCalled();
      expect(result).toEqual(mockManufacturer);
      expect(result.name).toBe('Test Manufacturer');
      expect(result).toBeDefined();
    });

    it('должен создать производителя с правильным именем', async () => {
      const dto: AddManufacturerDto = {
        name: 'Toyota',
      };

      const createdManufacturer = new Manufacturer('new-id', 'Toyota', 'Toyota Description');

      mockManufacturerRepository.addManuf.mockResolvedValue(createdManufacturer);

      const result = await manufacturerService.addManufacturer(dto);

      expect(result.name).toBe('Toyota');
      expect(mockManufacturerRepository.addManuf).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Toyota',
        }),
      );
    });
  });

  describe('getAllManufacturers', () => {
    it('должен вернуть всех производителей', async () => {
      const manufacturers = [
        new Manufacturer('id-1', 'Manufacturer 1', 'Description 1'),
        new Manufacturer('id-2', 'Manufacturer 2', 'Description 2'),
        new Manufacturer('id-3', 'Manufacturer 3', 'Description 3'),
      ];

      mockManufacturerRepository.getAllManuf.mockResolvedValue(manufacturers);

      const result = await manufacturerService.getAllManufacturers([]);

      expect(mockManufacturerRepository.getAllManuf).toHaveBeenCalled();
      expect(result).toEqual(manufacturers);
      expect(result.length).toBe(3);
    });

    it('должен вернуть пустой массив если производителей нет', async () => {
      mockManufacturerRepository.getAllManuf.mockResolvedValue([]);

      const result = await manufacturerService.getAllManufacturers([]);

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  describe('getManufacturerById', () => {
    it('должен вернуть производителя по его id', async () => {
      const manufacturerId = 'manufacturer-id-1';

      mockManufacturerRepository.getManufById.mockResolvedValue(mockManufacturer);

      const result = await manufacturerService.getManufacturerById(manufacturerId);

      expect(mockManufacturerRepository.getManufById).toHaveBeenCalledWith(manufacturerId);
      expect(result).toBeDefined();
      expect(result?.id).toBe('manufacturer-id-1');
    });

    it('должен вернуть null если производитель не найден', async () => {
      const manufacturerId = 'not-existent-id';

      mockManufacturerRepository.getManufById.mockResolvedValue(null);

      const result = await manufacturerService.getManufacturerById(manufacturerId);

      expect(result).toBeNull();
      expect(mockManufacturerRepository.getManufById).toHaveBeenCalledWith(manufacturerId);
    });
  });

  describe('updateManufacturerInfo', () => {
    it('должен успешно обновить производителя', async () => {
      const manufacturerId = 'manufacturer-id-1';
      const updateDto: UpdateInfoManufacturerDto = {
        name: 'updated-manufacturer-name',
        descriptionManufacturer: 'updated-manufacturer-description',
      };

      const updatedManufacturer = new Manufacturer(
        manufacturerId,
        'updated-manufacturer-name',
        'updated-manufacturer-description',
      );

      mockManufacturerRepository.updateManufInfo.mockResolvedValue(updatedManufacturer);

      const result = await manufacturerService.updateManufacturerInfo(manufacturerId, updateDto);

      expect(mockManufacturerRepository.updateManufInfo).toHaveBeenCalledWith(
        manufacturerId,
        expect.objectContaining({
          name: 'updated-manufacturer-name',
          descriptionManufacturer: 'updated-manufacturer-description',
        }),
      );
      expect(result).toEqual(updatedManufacturer);
      expect(result?.name).toBe('updated-manufacturer-name');
      expect(result?.descriptionManufacturer).toBe('updated-manufacturer-description');
    });

    it('должен вернуть null если производитель не найден', async () => {
      const manufacturerId = 'not-existent-manufacturer-id';
      const updateDto: UpdateInfoManufacturerDto = {
        name: 'updated-manufacturer-name',
        descriptionManufacturer: 'updated-manufacturer-description',
      };

      mockManufacturerRepository.updateManufInfo.mockResolvedValue(null);

      const result = await manufacturerService.updateManufacturerInfo(manufacturerId, updateDto);

      expect(result).toBeNull();
      expect(mockManufacturerRepository.updateManufInfo).toHaveBeenCalled();
    });

    it('должен выбросить ошибку если id не указан', async () => {
      const updateDto: UpdateInfoManufacturerDto = {
        name: 'updated-manufacturer-name',
      };

      await expect(manufacturerService.updateManufacturerInfo('', updateDto)).rejects.toThrow(
        'Manufacturer ID is required',
      );
    });
  });

  describe('updateManufacturerProducts', () => {
    it('должен успешно обновить список продуктов производителя', async () => {
      const manufacturerId = 'manufacturer-id-1';
      const updateDto: UpdateManufacturerDto = {
        productsIds: ['product-1', 'product-2', 'product-3'],
      };

      const updatedManufacturer = new Manufacturer(
        manufacturerId,
        'Test Manufacturer',
        'Test Description',
      );
      mockManufacturerRepository.updateListProductByManuf.mockResolvedValue(updatedManufacturer);

      const result = await manufacturerService.updateManufacturerProducts(
        manufacturerId,
        updateDto,
      );

      expect(mockManufacturerRepository.updateListProductByManuf).toHaveBeenCalledWith(
        manufacturerId,
        ['product-1', 'product-2', 'product-3'],
      );
      expect(result).toEqual(updatedManufacturer);
    });

    it('должен вернуть null если производитель не найден', async () => {
      const manufacturerId = 'non-existent-id';
      const updateDto: UpdateManufacturerDto = {
        productsIds: ['product-1'],
      };

      mockManufacturerRepository.updateListProductByManuf.mockResolvedValue(null);

      const result = await manufacturerService.updateManufacturerProducts(
        manufacturerId,
        updateDto,
      );

      expect(result).toBeNull();
    });

    it('должен выбросить ошибку если id не указан', async () => {
      const updateDto: UpdateManufacturerDto = {
        productsIds: ['product-1'],
      };

      await expect(manufacturerService.updateManufacturerProducts('', updateDto)).rejects.toThrow(
        'Manufacturer ID is required',
      );
    });

    it('должен выбросить ошибку если продуктов больше 100', async () => {
      const manufacturerId = 'manufacturer-id-1';
      const updateDto: UpdateManufacturerDto = {
        productsIds: Array.from({ length: 101 }, (_, i) => `product-${i}`),
      };

      await expect(
        manufacturerService.updateManufacturerProducts(manufacturerId, updateDto),
      ).rejects.toThrow('Manufacturer cannot have more than 100 products');
    });
  });

  describe('deleteManufacturer', () => {
    it('должен успешно удалить производителя', async () => {
      const manufacturerId = 'manufacturer-id-1';

      mockManufacturerRepository.deleteManuf.mockResolvedValue(true);

      const result = await manufacturerService.deleteManufacturer(manufacturerId);

      expect(mockManufacturerRepository.deleteManuf).toHaveBeenCalledWith(manufacturerId);
      expect(result).toBe(true);
    });

    it('должен вернуть false если производитель не найден', async () => {
      const manufacturerId = 'non-existent-id';

      mockManufacturerRepository.deleteManuf.mockResolvedValue(false);

      const result = await manufacturerService.deleteManufacturer(manufacturerId);

      expect(mockManufacturerRepository.deleteManuf).toHaveBeenCalledWith(manufacturerId);
      expect(result).toBe(false);
    });
  });
});
