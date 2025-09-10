const cloudinary = require("cloudinary").v2;
require("dotenv").config();
exports.cloudinaryConfig = () => {
      cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.cloud_api_key,
            api_secret: process.env.cloud_secret,
      });
};
