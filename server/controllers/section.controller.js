const SectionModel = require("../models/Section.model");
const CourseModel = require("../models/Course.model");
const createSection = async (req, res) => {
      try {
            // get the data from the body and also get the coure id from the body
            //which will be handed over body by frontend
            const { sectionName, courseID } = req.body;
            if (!sectionName || !courseID) return res.status(402).json({ message: "Section Name and Course id is required!" });
            const newSection = await SectionModel.create({ sectionName });
            const updatedCourse = await CourseModel.findByIdAndUpdate(courseID, { $push: { courseContent: newSection._id } }, { new: true }).populate("courseContent");
            res.status(201).json({ message: "New Section created", data: updatedCourse });
      } catch (error) {
            res.status(500).json({ message: "Unable to create the new Section ! Please check the Section Controller", error: error.message });
      }
};

const updatedSection = async (req, res) => {
      try {
            const { sectionId, sectionName } = req.body;
            if (!sectionName || !courseID) return res.status(402).json({ message: "Section Name and Course id is required!" });
            const updatedSection = await SectionModel.findByIdAndUpdate(sectionId, { sectionName }, { new: true });
            res.status(200).json({ message: "Section Name is updated", data: updatedSection });
      } catch (error) {
            res.status(500).json({ message: "Unable to update the Section ! Please check the Section Controller", error: error.message });
      }
};

const deleteSection = async (req, res) => {
      try {
            const { sectionId, courseID } = req.params;
            await SectionModel.findByIdAndDelete(sectionId);
            await CourseModel.findByIdAndUpdate(courseID, { $pull: { courseContent: sectionId } });
            res.status(200).json({ message: "Section Deleted !" });
      } catch (error) {
            res.status(500).json({ message: "Unable to delete the Section ! Please check the Section Controller", error: error.message });
      }
};

const getAllSections = async (req, res) => {
      try {
            const allSections = await SectionModel.find().populate("subSections");
            if (!allSections) return res.status(404).json({ message: "There is no Sections created" });
            res.status(200).json({ message: "Here is your all Sections", data: allSections });
      } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Unable to fetch all Sections from the DB" });
      }
};

module.exports = { createSection, updatedSection, deleteSection, getAllSections };
