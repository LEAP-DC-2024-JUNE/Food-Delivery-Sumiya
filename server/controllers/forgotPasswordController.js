import { UserModel } from "../models/userModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "sumiyagombo967@gmail.com",
        pass: "uxqr wvnd dzjz bleu",
      },
    });

    const mailOptions = {
      from: "sumiyagombo967@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You are receiving this email because you requested a password reset.</p>
               <p>Click the following link to reset your password:</p>
               <a href="http://localhost:3000/reset-password/${resetToken}">http://localhost:3000/reset-password/${resetToken}</a>
               <p>This link will expire in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Error processing your request" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Error resetting password" });
  }
};
