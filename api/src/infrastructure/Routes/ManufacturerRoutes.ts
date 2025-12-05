import { Router } from 'express';

import { ManufacturerController } from '../Controllers/ManufacturerController.js';
import { AddManufacturerDto } from '../../core/repositories/ManufacturerRepository/dto/addManufacturerDto.js';

import { validateDto } from '../Middleware/ValidateDto.js';
import { UpdateManufacturerDto } from '../../core/repositories/ManufacturerRepository/dto/updateManufacturerDto.js';
import { UpdateInfoManufacturerDto } from '../../core/repositories/ManufacturerRepository/dto/updateInfoManufRepo.js';

/**
 * @swagger
 * tags:
 *   name: Manufacturers
 *   description: API для управления производителями
 */
export function createManufacturerRouter(controller: ManufacturerController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/manufacturers:
   *   post:
   *     summary: Создать нового производителя
   *     tags: [Manufacturers]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AddManufacturerDto'
   *     responses:
   *       201:
   *         description: Производитель успешно создан
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Manufacturer'
   *       400:
   *         description: Ошибка валидации данных
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.post(
    '/manufacturers',
    validateDto(AddManufacturerDto),
    controller.addManuf.bind(controller),
  );

  /**
   * @swagger
   * /api/manufacturers/{id}:
   *   get:
   *     summary: Получить производителя по ID
   *     tags: [Manufacturers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID производителя
   *     responses:
   *       200:
   *         description: Производитель найден
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Manufacturer'
   *       400:
   *         description: Неверный ID
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.get('/manufacturers/:id', controller.getManufById.bind(controller));

  /**
   * @swagger
   * /api/manufacturers:
   *   get:
   *     summary: Получить всех производителей
   *     tags: [Manufacturers]
   *     responses:
   *       200:
   *         description: Список производителей
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Manufacturer'
   */
  router.get('/manufacturers', controller.getAllManufacturer.bind(controller));

  /**
   * @swagger
   * /api/manufacturers/{id}:
   *   put:
   *     summary: Обновить информацию о производителе
   *     tags: [Manufacturers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID производителя
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateInfoManufacturerDto'
   *     responses:
   *       200:
   *         description: Производитель успешно обновлен
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Manufacturer'
   *       400:
   *         description: Ошибка валидации или производитель не найден
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.put(
    '/manufacturers/:id',
    validateDto(UpdateInfoManufacturerDto),
    controller.updateManufInfo.bind(controller),
  );

  /**
   * @swagger
   * /api/manufacturers/{id}:
   *   patch:
   *     summary: Частично обновить информацию о производителе
   *     tags: [Manufacturers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID производителя
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateInfoManufacturerDto'
   *     responses:
   *       200:
   *         description: Производитель успешно обновлен
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Manufacturer'
   *       400:
   *         description: Ошибка валидации или производитель не найден
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.patch(
    '/manufacturers/:id',
    validateDto(UpdateInfoManufacturerDto),
    controller.updateManufInfo.bind(controller),
  );

  /**
   * @swagger
   * /api/manufacturers/{id}/products:
   *   put:
   *     summary: Обновить список продуктов производителя
   *     tags: [Manufacturers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID производителя
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateManufacturerDto'
   *     responses:
   *       200:
   *         description: Список продуктов успешно обновлен
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Manufacturer'
   *       400:
   *         description: Ошибка валидации или производитель не найден
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.put(
    '/manufacturers/:id/products',
    validateDto(UpdateManufacturerDto),
    controller.updateListProductByManuf.bind(controller),
  );

  /**
   * @swagger
   * /api/manufacturers/{id}:
   *   delete:
   *     summary: Удалить производителя
   *     tags: [Manufacturers]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID производителя
   *     responses:
   *       204:
   *         description: Производитель успешно удален
   *       404:
   *         description: Производитель не найден
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.delete('/manufacturers/:id', controller.deleteManuf.bind(controller));

  return router;
}
