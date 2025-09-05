const mongoose = require("mongoose");
const { transporter } = require("../utils/mailTransporter");
require("dotenv").config();
const otpSchema = new mongoose.Schema({
      otp: {
            type: Number,
            required: true,
      },
      email: {
            type: String,
            required: true,
      },
      used: {
            type: Boolean,
            required: true,
      },
      purpose: {
            type: String,
      },
      createdAt: {
            type: Date,
            default: Date.now,
            required: true,
      },
      expireAt: {
            type: Number,
            default: Date.now + 5 * 60,
            required: true,
      },
});

async function sendVerificationEmail(next) {
      try {
            const info = await transporter.sendMail({
                  from: `Edu-Tech | ${process.env.MAIL_USER} `,
                  to: this.email,
                  subject: this.purpose,
                  html: ` <div style="font-family: Arial, sans-serif; padding: 18px;">
        <h3 style="margin:0 0 8px 0;">Your verification code</h3>
        <p style="font-size: 22px; letter-spacing: 2px;"><strong>${otp}</strong></p>
        <p style="font-size: 13px; color: #666;">This code expires in 5 minutes.</p>
      </div>`,
            });
            next();
      } catch (error) {
            console.log(error.message);
            next();
      }
}
otpSchema.pre("save", sendVerificationEmail);

module.exports = mongoose.model("OTP", otpSchema);
