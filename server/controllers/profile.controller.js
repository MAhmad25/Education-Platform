const ProfileModel = require("../models/Profile.model");
const UserModel = require("../models/User.model");
// Update Profile🟢
const updateProfile = async (req, res) => {
      try {
            const { contactNumber = "", dob = "", gender = "", about = "" } = req.body;
            //Its not neccessary that user will put all the values because all are optional
            //if (!contactNumber || !dob || !gender || about) return res.status(402).json({ message: "All fields are required!" });
            //update the profile Section using that id in User Details
            //For that we need first get the userDetails from the User Mode
            const user = await UserModel.findById(req.user.id);
            //update the profile object using user.userDetails
            // and add update the userDetails in User Model
            const updatedProfile = await ProfileModel.findByIdAndUpdate(user.userDetails, { contactNumber, dob, gender, about }, { new: true });
            res.status(200).json({ message: "Profile Updated !", data: updateProfile });
      } catch (error) {
            res.status(500).json({ message: "Unable to update the profile !", error: error.message });
      }
};
// Delete User Profile 🟠
const deleteUser = async (req, res) => {
      try {
            const id = req.user.id;
            //User ko delete karne se pehle Profile ko delete karo
            //Sab se pehle User le kar ao
            const user = await UserModel.findById(id); //!ye lo user Bhai
            if (!user) return res.status(401).json({ message: "You cannot perform this action Make sure you are logged in" });
            //User me aik userDetails ke name se property ho gi usko use
            //karke Profile delete karo
            await ProfileModel.findByIdAndDelete(user.userDetails);
            //TODO:Crone Job Kya hoti ha ye check karna User ko 5 din baad delete karna ha
            await UserModel.findByIdAndDelete(user._id);
            res.status(200).json({ message: "User with Profile Deleted Successfully Courses data will remain same" });
      } catch (error) {
            res.status(500).json({ message: "Unable to delete the user account !", error: error.message });
      }
};
// get user Details🟣
const getUserDetails = async (req, res) => {
      try {
            const id = req.user.id;
            if (!id) return res.status(401).json({ message: "User is invalid" });
            const userDetails = await UserModel.findById(id).populate("userDetails");
            if (!userDetails) return res.status(401).json({ message: "You cannot perform this action Make sure you are logged in" });
            res.status(200).json({ message: "User Details", data: userDetails });
      } catch (error) {
            res.status(500).json({ message: "Unable to fetch the user details !", error: error.message });
      }
};

export { updateProfile, deleteUser, getUserDetails };
