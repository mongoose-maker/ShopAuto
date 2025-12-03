import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Импортируем модели и ассоциации для инициализации
import '../../infrastructure/DB/Associations/Associations.js';

dotenv.config();

let testSequelize: Sequelize | null = null;

export async function setupTestDb(): Promise<Sequelize> {
  if (testSequelize) {
    return testSequelize;
  }

  const testDbUrl = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;

  if (!testDbUrl) {
    throw new Error('TEST_DATABASE_URL or DATABASE_URL is not defined in .env file');
  }

  testSequelize = new Sequelize(testDbUrl, {
    dialect: 'postgres',
    logging: false,
  });

  await testSequelize.authenticate();

  // Синхронизация моделей (создание таблиц)
  // force: true удаляет все таблицы и создает их заново
  await testSequelize.sync({ force: true });

  return testSequelize;
}

export async function teardownTestDb(): Promise<void> {
  if (testSequelize) {
    await testSequelize.close();
    testSequelize = null;
  }
}

export async function clearTestDb(): Promise<void> {
  if (testSequelize) {
    // Удаляем все данные из таблиц
    await testSequelize.query('TRUNCATE TABLE products, categories, manufacturers CASCADE;');
  }
}
