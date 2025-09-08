const UserModel = require("../models/User.model");
const OTPModel = require("../models/OTP.model");
const ProfileModel = require("../models/Profile.model");
const { generateNumericOtp } = require("../utils/otpGenerator");
const mailSender = require("../utils/mailSender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
require("dotenv").config();
// Send OTP controller
const sendOTP = async (req, res) => {
      const { email } = req.body;
      const alreadyExist = await UserModel.findOne({ email });
      if (alreadyExist) return res.status(401).json({ message: "Email already being used" });
      //Generate OTP
      const otp = generateNumericOtp();
      // Make a otp model
      await OTPModel.create({ otp, email, used: true, purpose: "Email Verification Code" });
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
      const token = jwt.sign({ email, id: isExisted._id, role: isExisted.accountType }, process.env.SECRET, { expiresIn: "168h" });
      req.token = token;
      // Set the token in Cookie
      res.cookie("access_token", token, {
            httpOnly: true,
            // sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60,
      })
            // then send the user response
            .json({ message: "Welcome to your profile" });
};

const resetPasswordToken = async (req, res) => {
      try {
            // get the email from the body
            const { email } = req.body;
            // Validate Email
            if (!email) return res.status(400).json({ message: "Email is required for Reseting Password !" });
            // check if this email exist in database
            const userExist = await UserModel.findOne({ email });
            if (!userExist) return res.status(401).json({ message: "You email is invalid and cannot be used for reseting the password !" });
            // generate the token using crypto
            const token = crypto.randomUUID();
            //update the UserModel with token and token ExpirationDate
            await UserModel.findOneAndUpdate({ email }, { token, tokenExpire: Date.now() + 5 * 60 * 1000 });
            // create the url
            const url = `http://localhost:5173/reset-password/${token}`;
            // send email with url link
            const mailInfo = await mailSender(email, "Password Reset Email", `This is your password reset link: ${url} `);
            console.log({ mailInfo });
            res.status(200).json({ message: "Password Reset with Email sent successfully !" });
      } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Unable to send the Email with url Check the resetPasswordToken controller " });
      }
};

const resetPassword = async (req, res) => {
      try {
            // get the password , confirm password and token from the req.body
            const { password, confirmPassword, token } = req.body;
            //  validate if all the field is entered
            if (!password || !confirmPassword || !token) return res.status(400).json({ message: "All fields are required !" });
            // check if the password and confirm password is equal
            if (password !== confirmPassword) return res.status(400).json({ message: "Password and confirm password field does not match  !" });
            // find the user from the model on the basis of token
            const user = await UserModel.findOne({ token });
            // if not available handle it
            if (!user) return res.status(400).json({ message: "Token value is invalid !" });
            // also check if time expire of the token
            if (Date.now() > user.tokenExpire) {
                  // if time excedes handle it
                  return res.status(401).json({ message: "Token expired ! Generate Another" });
            }
            // hashed the password
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);
            // update the password with updated field
            await UserModel.findByIdAndUpdate(user._id, { password: hashedPass });
            // return the response success
            res.status(200).json({ message: "Password is updated Successfully !" });
      } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Unable to update the password Check the resetPassword controller " });
      }
};

// Change Password Controller

const changePassword = async (req, res) => {
      // Get the old password new password and confirm password from the req.body
      // check if old password is correct from the database
};

export { sendOTP, login, createAccount, resetPassword, resetPasswordToken, changePassword };
