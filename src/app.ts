import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: env.FRONTEND_URL,
  }),
);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/api/v1/auth" , authRouter );

app.use(globalErrorHandler)
export default app;
