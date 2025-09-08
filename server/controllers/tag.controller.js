const TagsModel = require("../models/Tags.model");

const createTag = async (req, res) => {
      try {
            // get the data
            const { tagName } = req.body;
            // validate data
            if (!tagName) return res.status(400).json({ message: "Tag name is required" });
            //create the tag object
            const newTag = await TagsModel.create({ name: tagName }, { new: true });
            return res.status(201).json({ message: `${newTag.name} Tag created Sucessfully` });
      } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Unable to create the tag" });
      }
};

const getAllTags = async (req, res) => {
      try {
            const allTags = await TagsModel.find();
            if (!allTags) return res.status(500).json({ message: "There is no tags created" });
            res.status(200).json({ message: "Here is your all Tags", data: allTags });
      } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Unable to fetch all tags from the DB" });
      }
};

export { createTag, getAllTags };
