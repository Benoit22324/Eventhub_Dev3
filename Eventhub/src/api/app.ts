import express from "express";
import { ApiRouter } from "./routes";
import { jsonApiResponseMiddleware, errorHandlerMiddleware } from "./middlewares";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "docs/swaggerConfig";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initialiseRedisClient } from "./config/redisConfig";
import { initializeMongoose } from "./config/mongooseConfig";

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions);

initializeMongoose();
initialiseRedisClient();

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(rateLimit({
    limit: 30
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);

app.use("/api", ApiRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandlerMiddleware);

app.listen(8000, () => console.log("✅ Serveur lancé sur localhost:8000"));