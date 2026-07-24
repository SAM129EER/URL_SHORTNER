import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_SECRET : process.env.JWT_SECRET
};
