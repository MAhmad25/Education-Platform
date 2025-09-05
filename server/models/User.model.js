const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
      {
            username: {
                  type: String,
                  trim: true,
                  required: true,
            },
            email: {
                  type: String,
                  trim: true,
                  required: true,
                  unique: true,
            },
            password: {
                  type: String,
                  trim: true,
                  required: true,
            },
            profilePic: {
                  type: String,
                  trim: true,
            },
            accountType: {
                  type: String,
                  enum: ["Admin", "Student", "Instructor"],
                  required: true,
            },
            userDetails: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Profile",
            },
            courses: [
                  {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Course",
                  },
            ],
            courseProgress: [
                  {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "CourseProgress",
                  },
            ],
      },
      {
            timestamps: true,
      }
);

module.exports = mongoose.model("User", userSchema);
