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
            phone: {
                  type: Number,
            },
            profilePic: {
                  type: String,
                  trim: true,
            },
            token: {
                  type: String,
            },
            tokenExpire: {
                  type: Date,
            },
            accountType: {
                  type: String,
                  enum: ["admin", "student", "instructor"],
                  required: true,
            },
            userDetails: {
                  type: mongoose.Schema.Types.ObjectId,
                  required: true,
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
