import { Router } from "express";
import { EventRoute } from "./eventRoute";
import { AuthRoute } from "./authRoute";
import { A2FRoute } from "./a2fRoute";
import { UserRoute } from "./userRoute";
import { AnalyticsRoute } from "./analyticsRoute";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/event", EventRoute);
router.use("/a2f", A2FRoute);
router.use("/user", UserRoute);
router.use("/analytics", AnalyticsRoute);

export { router as ApiRouter };