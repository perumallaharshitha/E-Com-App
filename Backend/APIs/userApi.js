const exp = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const tokenVerify = require("../middlewares/tokenVerify");
require("dotenv").config();

const userApp = exp.Router();
userApp.use(exp.json());

userApp.get("/users", tokenVerify, expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const usersList = await usersCollection.find().toArray();
  res.send({ message: "users", payload: usersList });
}));

userApp.get("/users/:username", tokenVerify, expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const username = req.params.username;
  const user = await usersCollection.findOne({ username });
  res.send({ message: "one user", payload: user });
}));

userApp.post("/user", expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const newUser = req.body;
  const existingUser = await usersCollection.findOne({ username: newUser.username });

  if (existingUser) {
    res.send({ message: "User already existed" });
  } else {
    newUser.password = await bcryptjs.hash(newUser.password, 7);
    newUser.products = [];
    await usersCollection.insertOne(newUser);
    res.send({ message: "user created" });
  }
}));

userApp.post("/login", expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const userCred = req.body;
  const dbUser = await usersCollection.findOne({ username: userCred.username });

  if (!dbUser) {
    res.send({ message: "Invalid username" });
  } else {
    const isValid = await bcryptjs.compare(userCred.password, dbUser.password);
    if (!isValid) {
      res.send({ message: "Invalid password" });
    } else {
      const token = jwt.sign({ username: userCred.username }, process.env.SECRET_KEY, { expiresIn: "1h" });
      res.send({ message: "login success", token, user: dbUser });
    }
  }
}));

userApp.put("/user", expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const modifiedUser = req.body;
  await usersCollection.updateOne({ username: modifiedUser.username }, { $set: modifiedUser });
  res.send({ message: "User modified" });
}));

userApp.delete("/user/:username", tokenVerify, expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const username = req.params.username;
  await usersCollection.deleteOne({ username });
  res.send({ message: "User deleted" });
}));

userApp.put("/add-to-cart/:username", expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const username = req.params.username;
  const productObj = req.body;
  const result = await usersCollection.updateOne({ username }, { $push: { products: productObj } });
  res.send({ message: "product added", payload: result });
}));

userApp.get("/cart/:username", expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const username = req.params.username;
  const user = await usersCollection.findOne({ username });
  res.send({ message: "cart", payload: user });
}));

module.exports = userApp;
