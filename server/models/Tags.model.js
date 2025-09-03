const mongoose = require("mongoose");
const tagsSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
            trim: true,
      },
      desc: {
            type: String,
            trim: true,
            required: true,
      },
      course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
      },
});
module.exports = mongoose.model("Tag", tagsSchema);
