const CourseModel = require("../models/Course.model");
const UserModel = require("../models/User.model");
const CategoryModel = require("../models/Category.model");
const path = require("path");
const cloudinary = require("cloudinary").v2;
// ! Create Course wale routes me multer ka middleware aye ga
const createCourse = async (req, res) => {
      try {
            // get all the data from req.body
            const { courseName, courseDesc, whatYouWillLearn, price, category } = req.body;
            // validate the data
            if (!courseName || !courseDesc || !whatYouWillLearn || !price || !category) {
                  return res.status(400).json({ message: "All fields are required" });
            }
            //  TODO Write the code for once to the utils functions
            const thumbnail = req.file.path;
            if (!thumbnail) return res.status(404).json({ message: "Thumbnail Picture is required !" });
            const supportedFormat = [".png", ".jpeg", ".jpg"];
            if (!supportedFormat.includes(path.extname(thumbnail))) return res.status(400).json({ message: "Only png , jpg and jpeg format type images can be used !" });
            const tempFile = path.resolve(thumbnail);
            const cloudLink = await cloudinary.uploader.upload(tempFile, { folder: "EduThumbnail", resource_type: "auto" });
            //!End of Cloud Upload
            //Check if category exist in the database
            // !Yaha pr ID ja rahi ha String nahi
            const categoryExist = await CategoryModel.findById(category);
            if (!categoryExist) return res.status(400).json({ message: `Sorry ! ${category} like category does not exists ! Report to the Admin` });
            //Create the new Course in db
            const newCourse = await CourseModel.create({ courseName, courseDesc, whatYouWillLearn, price, category, instructor: req.user.id, thumbnail: cloudLink.secure_url });
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

const getCourseDetails = async (req, res) => {
      try {
            const { courseID } = req.body;
            if (!courseID) return res.status(404).json({ message: "Course ID is required!" });
            const courseDetails = await CourseModel.findById(courseID)
                  ?.populate("instructor")
                  ?.populate({
                        path: "courseContent",
                        populate: {
                              path: "subSections",
                        },
                  })
                  ?.populate({
                        path: "ratingAndReviews",
                        populate: {
                              path: "user",
                              select: "username email profilePic",
                        },
                  })
                  ?.populate({
                        path: "enrolledStudents",
                  })
                  ?.populate("category");
            if (!courseDetails) return res.status(404).json({ message: "Unable to find the Course ! ", error: error.message });
            res.status(200).json({ message: "Here is all the Course Details", data: courseDetails });
      } catch (error) {
            res.status(500).json({ message: "Unable to get the course Details ! Please check the course Controller", error: error.message });
      }
};
module.exports = { createCourse, getAllCourses, getCourseDetails };
