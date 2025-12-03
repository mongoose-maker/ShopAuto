import { User } from "../../../core/models/User/User.js";
export class UserMapper {
    static toDomain(raw) {
        // Модель User ожидает id: undefined, но из БД приходит string | undefined
        // Передаем undefined, так как в доменной модели id не используется
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