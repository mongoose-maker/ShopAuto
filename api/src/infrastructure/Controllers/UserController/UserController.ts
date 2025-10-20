import type { Request, Response } from "express";
import { UserService } from "../../../core/Service/UserService.js";
import { AddUserDto } from "../../../core/repositories/UserRepository/dto/addUserDto.js";
import { UpdateUserDto } from "../../../core/repositories/UserRepository/dto/updateUserDto.js";

export class UserController {
  constructor(private readonly userService: UserService) {}
  async createUser(req: Request, res: Response): Promise<void> {
    const dto: AddUserDto = req.body;
    const newUser = await this.userService.createUser(dto);
    res.status(201).json(newUser);
  }
  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params; // ?
    if (!id) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const foundUser = await this.userService.getUserById(id);
    res.status(200).json(foundUser);
  }
  async updateDataUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const dto: UpdateUserDto = req.body;
    const updatedUser = await this.userService.updateDataUser(id, dto);
    res.status(200).json(updatedUser);
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    const id: string = req.body;
    const success = await this.userService.deleteUser(id);
    if (!success) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }
    res.status(204).send();
  }
}
