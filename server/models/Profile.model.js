const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
      contactNumber: {
            type: Number,
      },
      dob: {
            type: Date,
      },
      gender: {
            type: String,
      },
      about: {
            type: String,
            trim: true,
      },
});

module.exports = mongoose.model("Profile", profileSchema);
