import mongoose from "mongoose";
import bcrypt from "bcrypt";

const loginSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});
const loginModel = new mongoose.model("loginData", loginSchema);

// export const getsignUpUsers = async (req, res) => {
//   await signUpModel
//     .find({}, (err, data) => {
//       if (err) {
//         res.status(500).json({
//           error: "There is an error!",
//         });
//       } else {
//         res.status(200).json({
//           result: data,
//           message: "Success",
//         });
//       }
//     })
//     .clone();
// };
// export const getsignUpUsersById = async (req, res) => {
//   await signUpModel
//     .find({ _id: req.params.id }, (err, data) => {
//       if (err) {
//         res.status(500).json({
//           error: "There is an error!",
//         });
//       } else {
//         res.status(200).json({
//           result: data,
//           message: "Success",
//         });
//       }
//     })
//     .clone();
// };
export const loginRequest = async (req, res) => {
  console.log("req.body.password", req.body.password);
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;

    const newLogin = new loginModel({
      name: req.body.name,

      password: req.body.password,
    });

    res.status(200).json({
      message: "login successful",
    });
  } catch {
    res.status(500).json({
      error: "failed",
    });
  }
};
// export const insertManysignUpUsers = async (req, res) => {
//   await signUpModel.insertMany(req.body, (err) => {
//     if (err) {
//       res.status(500).json({
//         error: "There is an error!",
//       });
//     } else {
//       res.status(200).json({
//         message: "signUpUsers are inserted successfully",
//       });
//     }
//   });
// };
// export const deletesignUpUsers = async (req, res) => {
//   await signUpModel
//     .deleteOne({ _id: req.params.id }, (err, data) => {
//       if (err) {
//         res.status(500).json({
//           error: "There is an error!",
//         });
//       } else {
//         res.status(200).json({
//           message: "signUpUsers deleted succesfully",
//         });
//       }
//     })
//     .clone();
// };

// export const updatesignUpUsers = async (req, res) => {
//   await signUpModel
//     .updateOne(
//       { _id: req.params.id },
//       {
//         $set: {
//           name: req.body.name,
//           age: req.body.age,
//           address: req.body.address,
//           f_name: req.body.f_name,
//           m_name: req.body.m_name,
//         },
//       },
//       (err) => {
//         if (err) {
//           res.status(500).json({
//             error: "There is an error!",
//           });
//         } else {
//           res.status(200).json({
//             message: "signUpUsers are updated successfully",
//           });
//         }
//       }
//     )
//     .clone();
// };
