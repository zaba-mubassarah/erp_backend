import jwt from "jsonwebtoken";
export const authCheck = (req, res, next) => {
  const { authoraization } = req.headers;
  try {
    const token = authoraization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name } = decoded;
    req.name = name;
    next();
  } catch {
    res.status(401).json({
      status:401,
      error: "Authentication Failed!",
    });
  }
};
