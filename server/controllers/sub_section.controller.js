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
