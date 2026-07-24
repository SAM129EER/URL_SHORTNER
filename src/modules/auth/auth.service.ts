import {
  createUser,
  findByEmail,
  createEmailVerificationToken,
  createRefreshSession,
} from "./auth.repository.js";
import { AppError } from "../../utils/appError.js";
import {
  generateAccessToken,
  generateRandomToken,
  generateRefreshToken,
  hashPassword,
  hashToken,
} from "./auth.utils.js";
import { sendVerificationEmail } from "./auth.email.js";


// Register Service is here 
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

  // console.log(data)

  const newUser = await createUser({
    ...userData,
    password: hashedPassword,
  });

  const { password, ...safeUser } = newUser;

  //   email verifiaction token
  const randomToken = generateRandomToken();
  const hashedRandomToken = hashToken(randomToken);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

  await createEmailVerificationToken({
    userId: newUser.id,
    emailTokenHash: hashedRandomToken,
    expiresAt,
  });

  await sendVerificationEmail(newUser.email, randomToken, newUser.username);

  const accessToken = generateAccessToken(newUser.id, newUser.role);
  const refreshToken = generateRefreshToken(newUser.id, newUser.role);
  const hasedRefreshToken = hashToken(refreshToken);

  const refreshExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await createRefreshSession({
    userId: newUser.id,
    refreshTokenHash: hasedRefreshToken,
    expiresAt: refreshExpiresAt,
  });

  return {
    user: safeUser,
    refreshToken: refreshToken,
    accessToken: accessToken,
  };
};
