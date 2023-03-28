import express, { response } from "express";
import "express-async-errors";
import cors from "cors";
import { ValidationErrorMiddleware } from "./lib/middleware/validation";
import { initCorsMiddleware } from "./lib/middleware/cors";
import planetsRoutes from "./routes/planets";



const app = express();

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetsRoutes);

app.use(ValidationErrorMiddleware);

export default app;
