const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const { createCategory, getAllCategorys, getCategoryDetails } = require("../controllers/category.controller");
// Get Routes
router.get("/all-category", isAuthenticated, getAllCategorys);
router.get("/category/:categoryID", isAuthenticated, getCategoryDetails);
// Post Routes
router.post("/create-catgory", isAuthenticated, isAdmin, createCategory);

module.exports = router;
