const express = require("express");
const router = express.Router();
const { sendOTP, createAccount, login, resetPasswordToken, resetPassword } = require("../controllers/auth.controller");
// Post Routes
router.post("/sendOtp", sendOTP);
router.post("/signup", createAccount);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
