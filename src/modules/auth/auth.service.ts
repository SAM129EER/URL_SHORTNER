import { createUser, findByEmail , createEmailVerificationToken } from "./auth.repository.js";
import { AppError } from "../../utils/appError.js";
import { generateRandomToken, hashPassword, hashToken } from "./auth.utils.js";

export const registerService = async (data: {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  const user = await findByEmail(data.email);

  if (user) {
    throw new AppError(409, "User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const { passwordConfirm, ...userData } = data;

  const newUser = await createUser({
    ...userData,
    password: hashedPassword,
  });

  //   email verifiaction token
  const randomToken = generateRandomToken();
  const hashedRandomToken = hashToken(randomToken);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

  await createEmailVerificationToken({
    userId: newUser.id,
    emailTokenHash: hashedRandomToken,
    expiresAt,
  });
};
