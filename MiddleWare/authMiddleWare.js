import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;
const authMiddleWare = async (req, res, next) => {
  try {
    console.log("AuthMiddleWare");
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);
    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      req.body._id = decoded?.id;
    }
    // else {
    //   res.status(401).json("error");
    // }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

export default authMiddleWare;
