//DEPENDENCIES
import jwt from "jsonwebtoken";

//TOKEN VERIFICATION
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please LogIn to continue",
    });
  }
  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Token is not valid",
    });
  }
};

//ADMIN VERIFICATION
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
  });
};

//USER VERIFICATION
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin || req.user.id === req.params.userId) {
      next();
    } else {
      return res.status(403).json({
        message:
          "You are not authorized to perform this action. Please try again",
      });
    }
  });
};

//COMPANY VERIFICATION
export const verifyHotelOwner = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin || req.user.isHotelOwner) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
  });
};
