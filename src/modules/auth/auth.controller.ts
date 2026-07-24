import { Request, Response, NextFunction } from "express";

export const registerUserController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  res.status(201).json({
    success: true,
    message:
      "User created successfully. Please check your email to verify your account.",
  });
};

export const loginUserController = () => {};
