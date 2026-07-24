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
  firstName?: string;
  lastName?: string;
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
