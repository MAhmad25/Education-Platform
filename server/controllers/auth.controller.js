const UserModel = require("../models/User.model");
const OTPModel = require("../models/OTP.model");
const ProfileModel = require("../models/Profile.model");
const { generateNumericOtp } = require("../utils/otpGenerator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
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
      const { email, username, phone, confirmPass, password, role, otp } = req.body;
      // Apply Server side validation
      if (!email || !username || !confirmPass || !password || !otp)
            return res.status(401).json({
                  success: false,
                  message: "Please enter the required details",
            });
      if (confirmPass !== password) return res.status(500).json({ message: "Your confirm Password field did not match !" });
      const alreadyExist = await UserModel.findOne({ email });
      // Checking if user already exist with this email
      if (alreadyExist) return res.status(401).json({ message: "User with this email already exist !" });
      // Verify the OTP from the DB and from the user provided
      const otpProvided = await OTPModel.findOne({ email }).sort({ createdAt: -1 }).limit(1); //? Yaha pr latest otp le kar ana ha
      if (!otpProvided) return res.status(500).json({ message: "OTP is invalid" });
      if (otpProvided !== otp) return res.status(401).json({ message: "OTP does not match !" });
      // Hash the Password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      // Getting the default  profile picture for username from the dicebear api
      const profilePic = `https://api.dicebear.com/6.x/initials/svg?seed=${username}`;
      // Creating the additional details and setting it to null so that user can edit them later
      const profileDetails = await ProfileModel.create({ contactNumber: null, dob: null, gender: null, about: null });
      // Creating the New User
      await UserModel.create({ email, username, password: hashedPass, phone, accountType: role.toLowerCase(), profilePic, userDetails: profileDetails._id });
      res.status(201).json({
            message: "New User registered Successfully",
            email,
            password,
      });
};

// Login Controller
const login = async (req, res) => {
      // /get the data from the req.body
      const { email, password } = req.body;
      // validate the data so that frontend cannot bear the load for validation
      if (!email || !password) return res.status(401).json({ message: "Please fill all the required details" });
      // check the user that is trying is existed or not by verifying his/her email
      const isExisted = await UserModel.findOne({ email });
      if (!isExisted) return res.status(401).json({ message: "Email or password is incorrect !" });
      // match the password if it is correct using bcrypt
      const isCorrect = await bcrypt.compare(password, isExisted.password);
      if (!isCorrect) return res.status(401).json({ message: "Email or password is incorrect !" });
      //create the token using jwt and store it in req.user and also in cookie
      const token = jwt.sign({ email, id: isExisted._id }, process.env.SECRET, { expiresIn: "168h" });
      req.user = token;
      // Set the token in Cookie
      res.cookie("access_token", token, {
            httpOnly: true,
            // sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60,
      })
            // then send the user response
            .json({ message: "Welcome to your profile" });
};
// Change Password Controller
