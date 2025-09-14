const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
      courseName: {
            type: String,
            required: true,
            trim: true,
      },
      courseDesc: {
            type: String,
            required: true,
            trim: true,
      },
      whatYouWillLearn: {
            type: String,
            required: true,
      },
      price: {
            type: Number,
            required: true,
      },
      thumbnail: {
            type: String,
            required: true,
            trim: true,
      },
      instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
      },
      courseContent: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Section",
            },
      ],
      ratingAndReviews: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Rating",
            },
      ],
      category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
      },
      enrolledStudents: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
            },
      ],
});

module.exports = mongoose.model("Course", courseSchema);
