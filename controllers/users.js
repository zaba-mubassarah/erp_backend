import { v4 as uuid } from "uuid";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  f_name: {
    type: String,
    required: true,
  },
  m_name: {
    type: String,
    required: true,
  },
});
const userModel = new mongoose.model("User", userSchema);

export const getUsers = async (req, res) => {
  await userModel
    .find({}, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There is an error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    })
    .clone();
};
export const getUserById = async (req, res) => {
  await userModel
    .find({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There is an error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    })
    .clone();
};
export const saveUser = (req, res) => {
  const newUser = new userModel(req.body);
  newUser.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There is an error!",
      });
    } else {
      res.status(200).json({
        message: "User is inserted successfully",
      });
    }
  });
};
export const insertManyUser = async (req, res) => {
  await userModel.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There is an error!",
      });
    } else {
      res.status(200).json({
        message: "Users are inserted successfully",
      });
    }
  });
};
export const deleteUser = async (req, res) => {
  await userModel
    .deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There is an error!",
        });
      } else {
        res.status(200).json({
          message: "User deleted succesfully",
        });
      }
    })
    .clone();
};

export const updateUser = async (req, res) => {
  await userModel
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          address: req.body.address,
          f_name: req.body.f_name,
          m_name: req.body.m_name,
        },
      },
      (err) => {
        if (err) {
          res.status(500).json({
            error: "There is an error!",
          });
        } else {
          res.status(200).json({
            message: "Users are updated successfully",
          });
        }
      }
    )
    .clone();
};
