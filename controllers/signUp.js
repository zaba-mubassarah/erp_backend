import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUpSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  signUpUsersName: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});
const signUpModel = new mongoose.model("signUpUsers", signUpSchema);

export const getsignUpUsers = async (req, res) => {
  await signUpModel
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
export const getsignUpUsersById = async (req, res) => {
  await signUpModel
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
export const savesignUpUsers = async (req, res) => {
  console.log("req.body.password", req.body.password);
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;

    const newsignUpUsers = new signUpModel({
      name: req.body.name,
      userName: req.body.userName,
      password: req.body.password,
    });
    await newsignUpUsers.save();
    res.status(200).json({
      message: "success",
    });
  } catch {
    res.status(500).json({
      error: "failed",
    });
  }
};
export const insertManysignUpUsers = async (req, res) => {
  await signUpModel.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There is an error!",
      });
    } else {
      res.status(200).json({
        message: "signUpUsers are inserted successfully",
      });
    }
  });
};
export const deletesignUpUsers = async (req, res) => {
  await signUpModel
    .deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There is an error!",
        });
      } else {
        res.status(200).json({
          message: "signUpUsers deleted succesfully",
        });
      }
    })
    .clone();
};

export const updatesignUpUsers = async (req, res) => {
  await signUpModel
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
            message: "signUpUsers are updated successfully",
          });
        }
      }
    )
    .clone();
};
export const loginRequest = async (req, res) => {
  try {
    const user = await signUpModel.find({ name: req.body.name });
    if (user) {
      console.log(req.body.password, user[0].password);
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      console.log("isValidPassword", isValidPassword);
      if (isValidPassword) {
        const token = jwt.sign({ name: user[0].name }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(500).json({
          token: token,
          message: "Login Succesful",
        });
      } else {
        res.status(500).json({
          error: "Login failed",
        });
      }
    } else {
      res.status(500).json({
        error: "Login failed",
      });
    }
  } catch {
    res.status(500).json({
      error: "Login failed",
    });
  }
};
