import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../model/userModel.js";

//Protect Routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new Error("Not authorized as Admin");
  }
};

export { protect, admin };
