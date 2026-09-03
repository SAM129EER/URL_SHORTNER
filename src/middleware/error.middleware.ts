// src/middleware/error.middleware.ts

import {type Request,type Response, type NextFunction } from "express";
import { AppError } from "../utils/appError.js";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Custom application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unknown errors
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
