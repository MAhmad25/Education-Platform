const CourseModel = require("../models/Course.model");
const UserModel = require("../models/User.model");
const CategoryModel = require("../models/Category.model");
const createCourse = async (req, res) => {
      try {
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
            //Create the new Course in db
            const newCourse = await CourseModel.create({ courseName, courseDesc, whatYouWillLearn, price, category, instructor: req.user.id });
            //set the newCourse ID in UserModel courses array
            await UserModel.findByIdAndUpdate(req.user.id, { $push: { courses: newCourse._id } });
            res.status(201).json({ message: "New Course created Successfully !", data: newCourse });
      } catch (error) {
            res.status(500).json({ message: "Unable to create the new Course ! Please check the course Controller", error: error.message });
      }
};

const getAllCourses = async (_, res) => {
      try {
            const allCourses = await CourseModel.find();
            res.status(200).json({ message: "Here is your all courses", data: allCourses });
      } catch (error) {
            res.status(500).json({ message: "Unable to get the all Courses ! Please check the course Controller", error: error.message });
      }
};

export { createCourse, getAllCourses };
