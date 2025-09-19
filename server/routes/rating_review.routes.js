const express = require("express");
const router = express.Router();
const { createRating, getAverageRating, deleteRating, updateRatings } = require("../controllers/rating_review.controller");
const { isAuthenticated, isStudent } = require("../middlewares/auth.middleware");
// Get Routes
router.get("/average-rating", getAverageRating);
// Post Routes
router.post("/create-rating", isAuthenticated, isStudent, createRating);
// Delete Route
router.delete("/delete-rating", isAuthenticated, isStudent, deleteRating);
// Put Route
router.put("/update-rating", isAuthenticated, isStudent, updateRatings);
module.exports = router;
