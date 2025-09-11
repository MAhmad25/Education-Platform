const SubSectionModel = require("../models/SubSection.model");
const SectionModel = require("../models/Section.model");

const createSubSection = async (req, res) => {
      // get the data
      const { title, desc, timeDuration } = req.body;
      const videoUrl = req.file;
      // validate the data
      if (!title || !desc || !timeDuration || !videoUrl) return res.status(402).json({ message: "All field are required !" });
};
