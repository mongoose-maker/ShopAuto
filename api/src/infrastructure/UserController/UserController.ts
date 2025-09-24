import { Request, Response, NextFunction } from "express";
import { UserService } from "../../core/Service/UserService.ts";
import { AddUserDto } from "../../core/repositories/UserRepository/dto/addUserDto.ts";
import { UpdateUserDto } from "../../core/repositories/UserRepository/dto/updateUserDto.ts";

export class UserController {
  constructor(private readonly userService: UserService) {}
  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto: AddUserDto = req.body; // заказ
      const newUser = await this.userService.createUser(dto); // блюдо в заказе отправилось шефу
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.body;
      const foundUser = await this.userService.getUserById(id);
      res.status(201).json(foundUser);
    } catch (err) {
      next(err);
    }
  }
  async updateDataUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdateUserDto = req.body;
      const updatedUser = await this.userService.updateDataUser(id, dto);
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.body;
      const success = await this.userService.deleteUser(id);
      if (!success) {
        res.status(404).json({ message: "Пользователь не найден" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
