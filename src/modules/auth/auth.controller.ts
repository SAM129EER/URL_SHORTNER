import { Request, Response, NextFunction } from "express";
import { registerService } from "./auth.service.js";

// Cookie options for the refresh token
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // Set to true in production with HTTPS
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // Set to true in production with HTTPS
  sameSite: "lax" as const,
  maxAge: 15 *60 * 1000, // 7 days
  path: "/",
};

export const registerUserController = async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await registerService(req.body);
  // console.log(result);
  res.cookie("refreshToken", result.refreshToken, REFRESH_COOKIE_OPTIONS);
  res.cookie("accessToken", result.accessToken, ACCESS_COOKIE_OPTIONS);
  res.status(201).json({
    success: true,
    message:
      "User created successfully. Please check your email to verify your account.",
    data: {
      user: result.user,
    },
  });
};

export const loginUserController = () => {};
