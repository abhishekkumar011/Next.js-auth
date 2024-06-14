import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "abhi@abhi.in",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "Reset your password",
      html: `<p>Click <a href=${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}>here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }  or copy and paste the link below in your browser. <br/> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken} </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
