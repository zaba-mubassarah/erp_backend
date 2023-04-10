import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }
});
const categoryModel = new mongoose.model("Category", categorySchema);

let categories = [];
export const getCategories = async (req, res) => {
  await categoryModel
    .find({}, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There is an error!",
        });
      } else {
        res.status(200).json({
          result: data,
          status: "success",
        });
      }
    })
    .clone();
};
export const getCategoryById = (req, res) => {
  const { id } = req.params;
  const dataById = categories.find((item) => item.id === id);
  res.send(dataById);
};
export const saveCategories = (req, res) => {
  const newCategory = new categoryModel(req.body);
  newCategory.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There is an error!",
      });
    } else {
      res.status(200).json({
        message: "Category is inserted successfully",
      });
    }
  });
};
export const insertManyCategory = async (req, res) => {
  await categoryModel.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There is an error!",
      });
    } else {
      res.status(200).json({
        message: "Categories are inserted successfully",
      });
    }
  });
};
export const deleteCategory = (req, res) => {
  const { id } = req.params;

  categories = categories.filter((item) => {
    return item.id !== id;
  });

  res.send(`categories of id ${id} is deleted`);
};

export const updateCategory = async (req, res) => {
  await categoryModel
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description
        },
      },
      (err) => {
        if (err) {
          res.status(500).json({
            error: "There is an error!",
          });
        } else {
          res.status(200).json({
            message: "Categories are updated successfully",
          });
        }
      }
    )
    .clone();
};
