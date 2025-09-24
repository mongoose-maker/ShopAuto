export class AddUserDto {
  constructor(
    readonly id: undefined,
    readonly name: string,
    readonly email: string,
    readonly password: string
  ) {}
}

// ??? Есть ли смысл от дублирования того что уже есть в доменной сущности?
