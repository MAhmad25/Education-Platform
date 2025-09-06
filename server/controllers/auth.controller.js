const UserModel = require("../models/User.model");
const OTPModel = require("../models/OTP.model");
const { generateNumericOtp } = require("../utils/otpGenerator");
// Send OTP controller
const sendOTP = async (req, res) => {
      const { email } = req.body;
      const alreadyExist = await UserModel.findOne({ email });
      if (alreadyExist) return res.status(401).json({ message: "Email already being used" });
      //Generate OTP
      const otp = generateNumericOtp();
      // Make a otp model
      await OTPModel.create({ otp, email, used: true, purpose: "Verifying Email for the Signup" });
      res.status(201).json({
            success: true,
            message: "Email Verification Code is sent to your email",
      });
};

// Create Account Controller
const createAccount = async (req, res) => {
      // Getting the data from the Body
      const { email, username, phone, confirmPass, password, role } = req.body;
      if (confirmPass !== password) return res.status(500).json({ message: "Your confirm Password field did not match !" });
      const alreadyExist = await UserModel.findOne({ email });
      // Checking if user already exist with this email
      if (alreadyExist) return res.status(401).json({ message: "User with this email already exist !" });
      // Hash the Password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      // Creating the account
      const newUser = await UserModel.create({ email, username, password: hashedPass, phone, accountType: role.toLowerCase() });
      res.status(201).json({
            message: "New User registered Successfully",
            email,
            password,
      });
};

// Login Controller
// Change Password Controller
