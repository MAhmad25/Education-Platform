const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
      contactNumber: {
            type: Number,
      },
      dob: {
            type: String,
            required: true,
      },
      gender: {
            type: String,
            required: true,
      },
      about: {
            type: String,
            trim: true,
            required: true,
      },
});

module.exports = mongoose.model("Profile", profileSchema);
