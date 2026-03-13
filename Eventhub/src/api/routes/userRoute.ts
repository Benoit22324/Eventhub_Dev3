import { Router } from "express";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import GetUserByIdUseCase from "../../application/usecases/GetUserByIdUseCase";
import UserController from "../controllers/UserController";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

const userRepository = new UserRepository();
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

const userController = new UserController(
    getUserByIdUseCase
);
const router = Router();

router.get("/", authenticationMiddleware, userController.getUser.bind(userController));

export { router as UserRoute };