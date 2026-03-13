import { Router } from "express";
import A2FController from "../controllers/A2FController";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import UpdateUserOTPUseCase from "../../application/usecases/UpdateUserOTPUseCase";
import GetUserByIdUseCase from "../../application/usecases/GetUserByIdUseCase";
import BackupCodeRepository from "../../infrastructure/repositories/BackupCodeRepository";
import SaveBackupCodeUseCase from "../../application/usecases/SaveBackupCodeUseCase";
import DeleteBCByUserUseCase from "../../application/usecases/DeleteBCByUserUseCase";
import UseBackupCodeUseCase from "../../application/usecases/UseBackupCodeUseCase";
import rateLimit from "express-rate-limit";

const backupCodeRepository = new BackupCodeRepository();
const saveBackupCodeUseCase = new SaveBackupCodeUseCase(backupCodeRepository);
const useBackupCodeUseCase = new UseBackupCodeUseCase(backupCodeRepository);
const deleteBCByUserUseCase = new DeleteBCByUserUseCase(backupCodeRepository);

const userRepository = new UserRepository();
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserOTPUseCase = new UpdateUserOTPUseCase(userRepository);

const a2fController = new A2FController(
    getUserByIdUseCase,
    updateUserOTPUseCase,
    saveBackupCodeUseCase,
    deleteBCByUserUseCase,
    useBackupCodeUseCase
);
const router = Router();

router.use(authenticationMiddleware);
router.use(rateLimit({
    limit: 4
}));

router.get("/qrcode", a2fController.generate);
router.post("/verify", a2fController.verify.bind(a2fController));
router.put("/disable", a2fController.disable.bind(a2fController));
router.post("/backup", a2fController.useBackup.bind(a2fController));

export { router as A2FRoute };