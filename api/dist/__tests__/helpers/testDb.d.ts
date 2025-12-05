import { Sequelize } from 'sequelize';
import '../../infrastructure/DB/Associations/associations.js';
export declare function setupTestDb(): Promise<Sequelize>;
export declare function teardownTestDb(): Promise<void>;
export declare function clearTestDb(): Promise<void>;
//# sourceMappingURL=testDb.d.ts.map