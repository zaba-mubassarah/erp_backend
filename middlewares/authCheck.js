import jwt from "jsonwebtoken";
export const authCheck = (req, res, next) => {
  const { authoraization } = req.headers;
  console.log("authoraization", authoraization);
  try {
    const token = authoraization.split(" ")[1];
    console.log("authoraization ssddsds", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { name } = decoded;

    req.name = name;
    next();
  } catch {
    next("Authentication Failed!");
  }
};
