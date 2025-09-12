const ProfileModel = require("../models/Profile.model");
const UserModel = require("../models/User.model");
const updateProfile = async (req, res) => {
      const { contactNumber, dob, gender, about } = req.body;
      //Its not neccessary that user will put all the values because all are optional
      //       if (!contactNumber || !dob || !gender || about) return res.status(402).json({ message: "All fields are required!" });
      //
};
