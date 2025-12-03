import { UserService } from "../../core/Service/UserService.js";
import { AddUserDto } from "../../core/repositories/UserRepository/dto/addUserDto.js";
import { UpdateUserDto } from "../../core/repositories/UserRepository/dto/updateUserDto.js";
export class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(req, res) {
        const dto = req.body;
        const newUser = await this.userService.createUser(dto);
        res.status(201).json(newUser);
    }
    async getUserById(req, res) {
        const { id } = req.params; // ?
        if (!id) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const foundUser = await this.userService.getUserById(id);
        res.status(200).json(foundUser);
    }
    async updateDataUser(req, res) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const dto = req.body;
        const updatedUser = await this.userService.updateDataUser(id, dto);
        res.status(200).json(updatedUser);
    }
    async deleteUser(req, res) {
        const id = req.body;
        const success = await this.userService.deleteUser(id);
        if (!success) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        res.status(204).send();
    }
}
//# sourceMappingURL=UserController.js.map