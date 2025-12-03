import { Router } from "express";
import { UserController } from "../Controllers/UserController.js";
import { validateDto } from "../Middleware/ValidateDto.js";
import { AddUserDto } from "../../core/repositories/UserRepository/dto/addUserDto.js";
import { UpdateUserDto } from "../../core/repositories/UserRepository/dto/updateUserDto.js";

export function createUserRouter(controller: UserController): Router {
  const router = Router();

  router.post(
    "/users",
    validateDto(AddUserDto),
    controller.createUser.bind(controller)
  );

  router.get("/users/:id", controller.getUserById.bind(controller));

  router.put(
    "/users/:id",
    validateDto(UpdateUserDto),
    controller.updateDataUser.bind(controller)
  );

  router.delete("/users/:id", controller.deleteUser.bind(controller));

  return router;
}
