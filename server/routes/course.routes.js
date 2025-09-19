const express = require("express");
const router = express.Router();
const { createCourse, getAllCourses, getCourseDetails } = require("../controllers/course.controller");
const { isAuthenticated, isInstructor } = require("../middlewares/auth.middleware");
const upload = require("../utils/multer");
// Get Routes
router.get("/all-courses", getAllCourses);
router.get("course/:courseID", getCourseDetails);
// Post Routes
router.post("/create-course", isAuthenticated, isInstructor, upload.single("file"), createCourse);

module.exports = router;
