const express = require("express");
const router = express.Router();
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/sub_section.controller");
const { isAuthenticated, isInstructor } = require("../middlewares/auth.middleware");
router.post("/create-subsection", isAuthenticated, isInstructor, createSubSection);
router.put("/update-subsection", isAuthenticated, isInstructor, updateSubSection);
router.delete("/delete-subsection", isAuthenticated, isInstructor, deleteSubSection);
module.exports = router;
