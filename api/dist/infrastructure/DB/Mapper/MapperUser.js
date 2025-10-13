import { User } from "../../../core/models/User/User";
import { SeqUserAttributes } from "../ORM/SeqModel/SeqUserModel";
export class UserMapper {
    static toDOmain(raw) {
        return new User(raw.id, raw.name, raw.email, raw.password);
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