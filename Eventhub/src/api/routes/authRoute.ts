import { Router } from "express";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import LoginUseCase from "../../application/usecases/LoginUseCase";
import AuthController from "../controllers/AuthController";
import RegisterUseCase from "../../application/usecases/RegisterUseCase";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

const userRepository = new UserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const registerUseCase = new RegisterUseCase(userRepository);

const authController = new AuthController(
    loginUseCase,
    registerUseCase
);
const router = Router();

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));
router.get("/logout", authenticationMiddleware, authController.logout);
router.get("/me", authenticationMiddleware, authController.me);

export { router as AuthRoute };