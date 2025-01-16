import jwt from "jsonwebtoken";
import  User  from "../models/Users.js";

export const isAuth = async (req, res, next) => {
  try {
    // const token = req.headers.token;
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).json({
        message: "Please Login",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    res.status(500).json({
      message: "Login First",
    });
  }
};

