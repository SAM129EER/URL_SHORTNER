import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

const sendMail = (to: string, subject: string, html: string) => {
  return transporter.sendMail({
    from: `URL_SHORT ${env.SMTP_USER}`,
    to,
    subject,
    html,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const verifyUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #ffffff;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 28px; font-weight: 700; color: #1a1a2e; margin: 0;">TaskHub</h1>
      </div>

      <h2 style="font-size: 22px; font-weight: 600; color: #1a1a2e; margin-bottom: 8px;">
        Verify your email address
      </h2>

      <p style="font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 24px;">
        Hi <strong>${name}</strong>, welcome Please confirm your email address by clicking the button below.
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${verifyUrl}"
           style="display: inline-block; padding: 14px 36px; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600;">
          Verify Email
        </a>
      </div>

      <p style="font-size: 13px; color: #888; line-height: 1.5;">
        If the button above doesn't work, copy and paste this link into your browser:<br/>
        <a href="${verifyUrl}" style="color: #2563eb; word-break: break-all;">${verifyUrl}</a>
      </p>

      <p style="font-size: 13px; color: #888; margin-top: 24px;">
        This link expires in <strong>1 hours</strong>. If you didn't create a TaskHub account, you can safely ignore this email.
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} TaskHub. All rights reserved.
      </p>
    </div>
  `;

  await sendMail(email, "Verify your email – TaskHub", html);
};
