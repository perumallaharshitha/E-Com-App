const exp = require("express");
const expressAsyncHandler = require("express-async-handler");

const productApp = exp.Router();
productApp.use(exp.json());

productApp.get("/products", expressAsyncHandler(async (req, res) => {
  const productsCollection = req.app.get("productsCollection");
  const productsList = await productsCollection.find().toArray();
  res.send({ message: "products", payload: productsList });
}));

productApp.get("/products/:id", expressAsyncHandler(async (req, res) => {
  const productsCollection = req.app.get("productsCollection");
  const productId = Number(req.params.id);
  const product = await productsCollection.findOne({ id: productId });
  res.send({ message: "product", payload: product });
}));

module.exports = productApp;
