import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const validateTokenHandler = (req, res, next) => {
  let token;

  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Token Not Verified");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Token is not authorized or missing");
  }
};

export default validateTokenHandler;
