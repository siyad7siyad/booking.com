import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../../database/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is Required").isString(),
    check("password", "Password with 6 or more Required").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
);

// router.post("/reset-password", async (req: Request, res: Response) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
//     user.resetPasswordToken = otp;
//     user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
//     await user.save();

//     const resetUrl = `${process.env.FRONTEND_URL}/verify-otp`; // Redirect to OTP verification page

//     await sendEmail(
//       user.email,
//       "Password Reset Request",
//       `You requested a password reset. Use the following OTP to reset your password: ${otp}. This OTP is valid for 1 hour.`
//     );

//     res.status(200).json({ message: "Reset password email sent" });
//   } catch (error) {
//     // Cast the error to a specific type or use a type guard
//     if (error instanceof Error) {
//       console.error("Error resetting password:", error.message);
//       res
//         .status(500)
//         .json({ message: `Something went wrong: ${error.message}` });
//     } else {
//       console.error("Unexpected error resetting password:", error);
//       res.status(500).json({ message: "An unexpected error occurred" });
//     }
//   }
// });

// router.post("/verify-otp", async (req: Request, res: Response) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({
//       email,
//       resetPasswordToken: otp,
//       resetPasswordExpires: { $gt: Date.now() }, // Token must be valid (not expired)
//     });

//     if (!user) {
//       return res.status(400).json({ message: "OTP is invalid or has expired" });
//     }

//     res.status(200).json({ message: "OTP is valid" });
//   } catch (error) {
//     // Cast the error to a specific type or use a type guard
//     if (error instanceof Error) {
//       console.error("Error verifying OTP:", error.message);
//       res
//         .status(500)
//         .json({ message: `Something went wrong: ${error.message}` });
//     } else {
//       console.error("Unexpected error verifying OTP:", error);
//       res.status(500).json({ message: "An unexpected error occurred" });
//     }
//   }
// });

// router.post("/reset-password/:token", async (req: Request, res: Response) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() }, // Token must be valid (not expired)
//     });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "Password reset token is invalid or has expired" });
//     }

//     user.password = await bcrypt.hash(password, 8); // Hash the new password
//     user.resetPasswordToken = null; // Clear the reset token
//     user.resetPasswordExpires = null; // Clear the reset token expiration
//     await user.save();

//     res.status(200).json({ message: "Password successfully reset" });
//   } catch (error) {
//     // Cast the error to a specific type or use a type guard
//     if (error instanceof Error) {
//       console.error("Error resetting password:", error.message);
//       res
//         .status(500)
//         .json({ message: `Something went wrong: ${error.message}` });
//     } else {
//       console.error("Unexpected error resetting password:", error);
//       res.status(500).json({ message: "An unexpected error occurred" });
//     }
//   }
// });

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
