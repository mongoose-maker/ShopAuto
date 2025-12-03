import { User } from '../../../core/models/User/User.js';
import type { SeqUserAttributes } from '../ORM/SeqModel/SeqUserModel.js';
export declare class UserMapper {
    static toDomain(raw: SeqUserAttributes): User;
    static toPersistence(user: User): Omit<SeqUserAttributes, 'id'>;
}
//# sourceMappingURL=MapperUser.d.ts.map