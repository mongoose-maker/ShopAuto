import { User } from "../../../core/models/User/User";
import { SeqUserAttributes } from "../ORM/SeqModel/SeqUserModel";
export declare class UserMapper {
    static toDOmain(raw: SeqUserAttributes): User;
    static toPersistence(user: User): Omit<SeqUserAttributes, "id">;
}
//# sourceMappingURL=MapperUser.d.ts.map