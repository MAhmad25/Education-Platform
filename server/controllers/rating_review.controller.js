const RatingModel = require("../models/RatingAndReviews.model");
const CourseModel = require("../models/Course.model");

// Create-Rating Controller
const createRating = async (req, res) => {
      try {
            const { ratings, review = "", courseID } = req.body;
            if (!ratings || !courseID) return res.status(402).json({ message: "Rating Field  is required !" });
            const isEnrolled = await CourseModel.findOne({ _id: courseID, enrolledStudents: req.user.id });
            if (!isEnrolled) return res.status(402).json({ message: "You cannot Review this course because you are not enrolled !" });
            // Check if user has already reviewed this course
            const alreadyReviewed = await RatingModel.findOne({ user: req.user.id, course: courseID });
            if (alreadyReviewed) return res.status(400).json({ message: "You have already reviewed this course!" });
            // Create new rating and review
            const ratingDetails = await RatingModel.create({ ratings, review, user: req.user.id, course: isEnrolled._id });
            await CourseModel.findByIdAndUpdate(courseID, { $push: { ratingAndReviews: ratingDetails._id } });
            res.status(201).json({ message: "New Rating is created !", ratingDetails });
      } catch (error) {
            res.status(500).json({ message: "Unable to Create the Rating", error: error.message });
      }
};

// Get Average Rating

const getAverageRating = async (req, res) => {
      try {
            const { courseID } = req.body;
            if (!courseID) return res.status(404).json({ message: "Course ID Not Found !" });
            const courseDetails = await CourseModel.findById(courseID).populate("ratingAndReviews");
            const averageRating =
                  courseDetails.ratingAndReviews.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.ratings;
                  }, 0) / courseDetails.ratingAndReviews.length;

            res.status(200).json({ message: "Average Rating of the Course", averageRating });
      } catch (error) {
            res.status(500).json({ message: "The Problem in Raing Controller", error: error.message });
      }
};
// Delete Rating-
const deleteRating = async (req, res) => {
      try {
            const { courseID, ratingID } = req.body;
            if (!courseID || !ratingID) return res.status(404).json({ message: "Course ID and Rating ID Not Found !" });
            const ratingDetails = await RatingModel.findByIdAndDelete(ratingID);
            if (!ratingDetails) return res.status(404).json({ message: "Rating ID is invalid !" });
            await CourseModel.findByIdAndUpdate(courseID, { $pull: { ratingAndReviews: ratingID } });
      } catch (error) {
            res.status(500).json({ message: "Unable to Delete the Rating", error: error.message });
      }
};
// Update Rating=
const updateRatings = async (req, res) => {
      try {
            const { ratings, review = "", ratingID } = req.body;
            if (!ratings) return res.status(402).json({ message: "Rating Field is required !" });
            const ratingDetails = await RatingModel.findByIdAndUpdate(ratingID, { ratings, review, user: req.user.id }, { new: true });
            res.status(200).json({ message: "Rating is Updated !", ratingDetails });
      } catch (error) {
            res.status(500).json({ message: "Unable to Update the Rating", error: error.message });
      }
};

export { createRating, getAverageRating, deleteRating, updateRatings };
