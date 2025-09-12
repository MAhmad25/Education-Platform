const SubSectionModel = require("../models/SubSection.model");
const SectionModel = require("../models/Section.model");

// Is controller ke routes se pehle multer middleware aye ga
const createSubSection = async (req, res) => {
      try {
            // get the data
            const { title, desc, timeDuration, sectionId } = req.body;
            const videoUrl = req.file || "";
            // validate the data
            if (!title || !desc || !timeDuration || !videoUrl) return res.status(402).json({ message: "All field are required !" });
            // TODO: Image upload karni ha cloudninary pe wo lazmi karna
            // creating the subsection object
            const subSection = await SubSectionModel.create({ title, desc, timeDuration, videoUrl });
            // update the section with subSection id
            const updatedSection = await SectionModel.findByIdAndUpdate(sectionId, { $push: { subSections: subSection._id } }, { new: true }).populate("subSections");
            res.status(201).json({ message: "Sub Section created !", data: updatedSection });
      } catch (error) {
            res.status(500).json({ message: "Unable to create the SubSection !", error: error.message });
      }
};

const updateSubSection = async (req, res) => {
      try {
            const { subSectionID } = req.params;
            if (!subSectionID) return res.status(400).json({ message: "ID is required" });
            const previous = await SubSectionModel.findById(subSectionID);
            if (!previous) return res.status(404).json({ message: "SubSection not found" });

            // take only keys actually provided by the client (ignore undefined)
            // TODO: need to study how Object.fromEntries Works
            const updates = Object.fromEntries(Object.entries(req.body || {}).filter(([, v]) => v !== undefined));

            // if multer provided a file, set the videoUrl explicitly
            if (req.file) {
                  updates.videoUrl = req.file.path || req.file.filename || req.file;
            }

            if (Object.keys(updates).length === 0) {
                  return res.status(400).json({ message: "No fields provided to update" });
            }

            const updated = await SubSectionModel.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });

            return res.status(200).json({ message: "Updated SubSection", data: updated });
      } catch (error) {
            return res.status(500).json({ message: "Unable to update the SubSection", error: error.message });
      }
};

const deleteSubSection = async (req, res) => {
      try {
            // get the id from the params
            const { subSectionID, sectionId } = req.params;
            // validate the id
            if (!subSectionID) return res.status(400).json({ message: "ID is required" });
            const subSection = await SubSectionModel.findById(subSectionID);
            // validate the SubSection Existence
            if (!subSection) return res.status(404).json({ message: "SubSection not found" });
            //delete the SubSection Object
            await SubSectionModel.findByIdAndDelete(subSection._id);
            // delete it from the Section Model using $pull
            const updatedSection = await SectionModel.findByIdAndUpdate(sectionId, { $pull: { subSections: subSection._id } }, { new: true });
            return res.status(200).json({ message: "Deleted SubSection", data: updatedSection });
      } catch (error) {
            return res.status(500).json({ message: "Unable to delete the SubSection", error: error.message });
      }
};

export { createSubSection, updateSubSection, deleteSubSection };
