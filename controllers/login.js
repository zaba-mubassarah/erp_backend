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
