import { Router } from "express";
import AnalyticsController from "../controllers/AnalyticsController";
import { MongoAnalyticsRepository } from "../../infrastructure/repositories/MongoAnalyticsRepository";
import { RecordAnalyticsCommand } from "../../application/commands/RecordAnalyticsCommand";
import { GetAnalyticsQuery } from "../../application/queries/GetAnalyticsQuery";
import { authenticationMiddleware, authorizeRolesMiddleware } from "../middlewares";
import { Role } from "@prisma/client";

const analyticsRepository = new MongoAnalyticsRepository();
const recordAnalyticsCommand = new RecordAnalyticsCommand(analyticsRepository);
const getAnalyticsQuery = new GetAnalyticsQuery(analyticsRepository);

const analyticsController = new AnalyticsController(
    recordAnalyticsCommand,
    getAnalyticsQuery
)
const router = Router();

router.post("/", analyticsController.recordAnalytics.bind(analyticsController));

router.use(authenticationMiddleware);
router.use(authorizeRolesMiddleware(Role.admin));
router.get("/", analyticsController.getAnalytics.bind(analyticsController));

export { router as AnalyticsRoute };