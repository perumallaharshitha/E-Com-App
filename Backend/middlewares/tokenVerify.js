const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenVerify = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.send({ message: "Unauthorised access" });

  const token = bearerToken.split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch {
    res.send({ message: "Token expired. Please re-login to continue" });
  }
};

module.exports = tokenVerify;
