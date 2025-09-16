const mongoose = require("mongoose");
const ratingAndReviewsSchema = new mongoose.Schema({
      user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
      },
      ratings: {
            type: Number,
            required: true,
      },
      review: {
            type: String,
            trim: true,
      },
      course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
      },
});
module.exports = mongoose.model("Rating", ratingAndReviewsSchema);
