import bcrypt from "bcrypt";
import {
  signUpModel
} from "../controllers/signUp.js";
import jwt from "jsonwebtoken";

export const loginRequest = async (req, res) => {
  try {
    const user = await signUpModel.find({ name: req.body.name });
    console.log("user",user);
    if (user) {
      console.log(req.body.password, user[0].password);
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign({ name: user[0].name }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        console.log("token",token)
        res.status(200).json({
          name: req.body.name,
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
