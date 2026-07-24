import { prisma } from "../../config/prisma.js";

export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// auth.repository.ts

export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return prisma.user.create({
    data,
  });
};

export const createEmailVerificationToken = async (data: {
  userId: string;
  emailTokenHash: string;
  expiresAt: Date;
}) => {
  return prisma.emailVerificationToken.create({
    data,
  });
};

export const createRefreshSession = async (data: {
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
}) => {
  return prisma.refreshSession.create({
    data,
  });
};
