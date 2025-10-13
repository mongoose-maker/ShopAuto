export class AddUserDto {
    id;
    name;
    email;
    password;
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
// ??? Есть ли смысл от дублирования того что уже есть в доменной сущности?
//# sourceMappingURL=addUserDto.js.map