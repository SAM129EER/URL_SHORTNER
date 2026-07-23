import { type Request, type Response, type NextFunction } from "express";

type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any> | any;

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
