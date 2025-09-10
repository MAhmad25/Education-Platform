const CourseModel = require("../models/Course.model");
const UserModel = require("../models/User.model");
const CategoryModel = require("../models/Category.model");
const createCourse = async (req, res) => {
      // get all the data from req.body
      const { courseName, courseDesc, whatYouWillLearn, price, category } = req.body;
      // validate the data
      if (!courseName || !courseDesc || !whatYouWillLearn || !price || !category || !req.file) {
            return res.status(402).json({ message: "All fields are required" });
      }
      //Check if category exist in the database
      const categoryExist = await CategoryModel.findById(category);
      if (!categoryExist) return res.status(402).json({ message: `Sorry ! ${category} like category does not exists ! Report to the Admin` });
      //  TODO create the cloundinary url
};

export { createCourse };
