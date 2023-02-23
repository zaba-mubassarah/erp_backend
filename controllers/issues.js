import { v4 as uuid } from "uuid";
import mongoose from "mongoose";

const issuSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  module: {
    type: String,
    required: true,
  },
});
const issueModel = new mongoose.model("Issue", issuSchema);

let issues = [];
export const getIssues = async (req, res) => {
  await issueModel
    .find({}, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There is an error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Issue is inserted successfully",
        });
      }
    })
    .clone();
};
export const getIssuesById = (req, res) => {
  const { id } = req.params;
  const dataById = issues.find((item) => item.id === id);
  res.send(dataById);
};
export const saveIssues = (req, res) => {
  const newIssue = new issueModel(req.body);
  newIssue.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There is an error!",
      });
    } else {
      res.status(200).json({
        message: "Issue is inserted successfully",
      });
    }
  });
};
export const insertManyIssue = async (req, res) => {
  await issueModel.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There is an error!",
      });
    } else {
      res.status(200).json({
        message: "Issues are inserted successfully",
      });
    }
  });
};
export const deleteIssue = (req, res) => {
  const { id } = req.params;

  issues = issues.filter((item) => {
    return item.id !== id;
  });

  res.send(`issues of id ${id} is deleted`);
};

export const updateIssue = async (req, res) => {
  await issueModel
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          module: req.body.module,
        },
      },
      (err) => {
        if (err) {
          res.status(500).json({
            error: "There is an error!",
          });
        } else {
          res.status(200).json({
            message: "Issues are updated successfully",
          });
        }
      }
    )
    .clone();
};
