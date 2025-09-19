const express = require("express");
const router = express.Router();
const { createSection, updateSection, deleteSection, getAllSections } = require("../controllers/section.controller");
const { isAuthenticated, isInstructor } = require("../middlewares/auth.middleware");

// Get Route
router.get("/all-sections", getAllSections);
// Post Route
router.post("/create-section", isAuthenticated, isInstructor, createSection);
// Put Route
router.put("/update-section", isAuthenticated, isInstructor, updateSection);
// Delete Route
router.delete("/delete-section", isAuthenticated, isInstructor, deleteSection);

module.exports = router;
