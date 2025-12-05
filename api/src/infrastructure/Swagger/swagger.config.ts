import swaggerJsdoc from 'swagger-jsdoc';
import type { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ShopAuto API',
    version: '1.0.0',
    description: 'API для интернет-магазина автозапчастей',
    contact: {
      name: 'API Support',
      email: 'support@shopauto.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'https://api.shopauto.com',
      description: 'Production server',
    },
  ],
  components: {
    schemas: {
      Manufacturer: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Уникальный идентификатор производителя',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          name: {
            type: 'string',
            description: 'Название производителя',
            example: 'Toyota',
          },
          descriptionManufacturer: {
            type: 'string',
            description: 'Описание производителя',
            example: 'Японский производитель автомобилей',
          },
        },
        required: ['name'],
      },
      AddManufacturerDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Название производителя',
            minLength: 2,
            maxLength: 100,
            example: 'Toyota',
          },
          descriptionManufacturer: {
            type: 'string',
            description: 'Описание производителя',
            maxLength: 500,
            example: 'Японский производитель автомобилей',
          },
        },
        required: ['name'],
      },
      UpdateInfoManufacturerDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Новое название производителя',
            minLength: 2,
            maxLength: 100,
            example: 'Toyota Motors',
          },
          descriptionManufacturer: {
            type: 'string',
            description: 'Новое описание производителя',
            maxLength: 500,
            example: 'Крупнейший японский производитель автомобилей',
          },
        },
      },
      UpdateManufacturerDto: {
        type: 'object',
        properties: {
          productsIds: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Список ID продуктов производителя',
            example: ['product-id-1', 'product-id-2'],
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Сообщение об ошибке',
            example: 'Manufacturer not found',
          },
          statusCode: {
            type: 'number',
            description: 'HTTP статус код',
            example: 404,
          },
        },
      },
    },
  },
};

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: ['./src/infrastructure/Routes/**/*.ts', './src/infrastructure/Controllers/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
