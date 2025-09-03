const mongoose = require("mongoose");
const ratingAndReviewsSchema = new mongoose.Schema({
      user: {
            type: String,
            required: true,
            trim: true,
      },
      ratings: {
            type: Number,
      },
      reviews: {
            type: String,
            trim: true,
      },
});
module.exports = mongoose.model("Rating", ratingAndReviewsSchema);
