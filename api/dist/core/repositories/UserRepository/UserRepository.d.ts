import { User } from '../../models/User/User.js';
import { UpdateUserDto } from './dto/updateUserDto.js';
export interface UserRepository {
    createUser(user: User): Promise<User | null>;
    getUserById(id: string): Promise<User | null>;
    updateDataUser(id: string, dto: UpdateUserDto): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
}
//# sourceMappingURL=UserRepository.d.ts.map