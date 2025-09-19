const express = require("express");
const router = express.Router();
const { updateProfile, deleteUser, getUserDetails } = require("../controllers/profile.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
// Get Route
router.get("/me", isAuthenticated, getUserDetails);
// Put Route
router.put("/update-profile", isAuthenticated, updateProfile);
// Delete Route
router.delete("/delete-me", isAuthenticated, deleteUser);

module.exports = router;
