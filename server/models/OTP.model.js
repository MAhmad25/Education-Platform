const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSchema = new mongoose.Schema(
      {
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
      },
      {
            timestamps: true,
      }
);

async function sendVerificationEmail(next) {
      try {
            const info = await mailSender(this.email, this.purpose, `Here is your OTP Code:  ${this.otp}`);
            next();
      } catch (error) {
            console.log("Error while sending the email check the OTP Model: ", error.message);
            next();
      }
}
otpSchema.pre("save", sendVerificationEmail);

module.exports = mongoose.model("OTP", otpSchema);
