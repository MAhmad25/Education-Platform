const CategoryModel = require("../models/Category.model");
const createCategory = async (req, res) => {
      try {
            // get the data
            const { categoryName } = req.body;
            // validate data
            if (!categoryName) return res.status(400).json({ message: "Category name is required" });
            //create the category object
            const newCategory = await CategoryModel.create({ name: categoryName }, { new: true });
            return res.status(201).json({ message: `${newCategory.name} Category created Sucessfully` });
      } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Unable to create the Category" });
      }
};

const getAllCategorys = async (_, res) => {
      try {
            const allcategorys = await CategoryModel.find({});
            if (!allcategorys) return res.status(500).json({ message: "There is no Categorys created" });
            res.status(200).json({ message: "Here is your all categorys", data: allcategorys });
      } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Unable to fetch all Categorys from the DB", error: error.message });
      }
};

const getCategoryDetails = async (req, res) => {
      try {
            const { categoryID } = req.body;
            if (!categoryID) return res.status(404).json({ message: "Category ID is required !" });
            const categoryDetails = await CategoryModel.findById(categoryID).populate("course");
            if (!categoryDetails) return res.status(404).json({ message: "Category Details not Found !" });
            res.status(200).json({ message: "Category Details", data: categoryDetails });
      } catch (error) {
            return res.status(500).json({ message: "Unable to fetch the category Details from the DB", error: error.message });
      }
};

module.exports = { createCategory, getAllCategorys, getCategoryDetails };
