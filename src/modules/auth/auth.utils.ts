import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { env } from "../../config/env.js";

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = (
  password: string,
  hashedpassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedpassword);
};

export const generateAccessToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, env.JWT_SECRET!, { expiresIn: "5min" });
};

export const generateRefreshToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
};

export interface JwtPayload {
  id: string;
  role: string;
}

export const verifyAccessToken = (token: string) => {
  const payload = jwt.verify(token, env.JWT_SECRET!) as JwtPayload;
  return payload;
};
export const verifyRefreshToken = (token: string) => {
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET!) as JwtPayload;
  return payload;
};

export const generateRandomToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Hash a token with SHA-256 before storing in the DB.
 * We only store the hash so a DB leak doesn't expose valid tokens.
 */
export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
