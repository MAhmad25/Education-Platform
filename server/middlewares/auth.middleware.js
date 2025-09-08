const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
      try {
            // get the token from the req.cookie
            const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ", "");
            // check if the token exist in req.body or req.cookies or in req.header("Authorization")
            if (!token) return res.status(401).json({ success: false, message: "User is not logged in !" });
            // decode it using jwt's verify
            const decoded = jwt.verify(token, process.env.SECRET);
            if (!decoded) return res.status(500).json({ message: "Something wrong while decoding the token" });
            // get the id and check if that user exist
            const userExist = await UserModel.findById(decoded.id);
            // if that does not exist then return response otherwise next()
            if (!userExist) return res.status(401).json({ message: "You must be logged in" });
            req.user = decoded;
            next();
      } catch (error) {
            res.status(500).json({ message: "Unable to authenticate User" });
      }
};

const isStudent = async (req, res, next) => {
      // get the role from req.user.role
      const role = req.user?.role;
      // check its accountType
      // if it does not match with students then return response 401
      if (role !== "student") return res.status(401).json({ message: "Only Students can access these resources !" });
      //now easily called next()
      next();
};

const isInstructor = async (req, res, next) => {
      // get the role from req.user.role
      const role = req.user?.role;
      // check its accountType
      // if it does not match with students then return response 401
      if (role !== "instructor") return res.status(401).json({ message: "Only instructors can access these resources !" });
      //now easily called next()
      next();
};

const isAdmin = async (req, res, next) => {
      // get the role from req.user.role
      const role = req.user?.role;
      // check its accountType
      // if it does not match with students then return response 401
      if (role !== "admin") return res.status(401).json({ message: "Only admin can access these resources !" });
      //now easily called next()
      next();
};

export { isAuthenticated, isStudent, isInstructor, isAdmin };
