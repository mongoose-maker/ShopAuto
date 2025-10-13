import { User } from "../../../core/models/User/User.js";
import type { SeqUserAttributes } from "../ORM/SeqModel/SeqUserModel.js";

export class UserMapper {
  static toDOmain(raw: SeqUserAttributes): User {
    return new User(raw.id, raw.name, raw.email, raw.password);
  }
  static toPersistence(user: User): Omit<SeqUserAttributes, "id"> {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
