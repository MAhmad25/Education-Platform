const express = require("express");
const router = express.Router();
const { createCourse, getAllCourses, getCourseDetails } = require("../controllers/course.controller");
const { isAuthenticated, isInstructor } = require("../middlewares/auth.middleware");
const uploads = require("../utils/multer");
// Get Routes
router.get("/all-courses", getAllCourses);
router.get("/course-details", getCourseDetails);
// Post Routes
router.post("/create-course", isAuthenticated, isInstructor, uploads.single("file"), createCourse);

module.exports = router;
