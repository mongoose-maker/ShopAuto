import { User } from "../../../models/User/User";
export class UpdateUserDto {
    name;
    email;
    password;
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
//# sourceMappingURL=updateUserDto.js.map