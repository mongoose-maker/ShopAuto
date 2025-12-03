import { User } from '../../../core/models/User/User.js';
export class UserMapper {
    static toDomain(raw) {
        return new User(undefined, raw.name, raw.email, raw.password);
    }
    static toPersistence(user) {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }
}
//# sourceMappingURL=MapperUser.js.map