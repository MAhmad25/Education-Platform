const express = require("express");
require("dotenv").config();
require("./config/db").connect();
require("./config/cloudinary").cloudinaryConfig();
const app = express();
const PORT = process.env.PORT;

// TODO: Require the Routes from route folder

app.use(express.json()); // ?Middleware for parsing body data
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const courseRoutes = require("./routes/course.routes");
const paymentRoutes = require("./routes/payment.routes");
const profileRoutes = require("./routes/profile.routes");
const ratingReviewRoutes = require("./routes/rating_review.routes");
const sectionRoutes = require("./routes/section.routes");
const subSectionRoutes = require("./routes/sub_section.routes");

app.use(express.json()); // ?Middleware for parsing body data
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/rating-review", ratingReviewRoutes);
app.use("/api/v1/section", sectionRoutes);
app.use("/api/v1/sub-section", subSectionRoutes);
app.listen(PORT, () => console.log("Server started")); //! Server Listening
