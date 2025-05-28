const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());

// MongoDB connection
const mClient = new MongoClient(process.env.DB_URL);

mClient.connect()
  .then(client => {
    const db = client.db("pvpdb");
    app.set("usersCollection", db.collection("users"));
    app.set("productsCollection", db.collection("products"));
    app.set("cartCollection", db.collection("cart"));

    console.log("DB connected successfully");

    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to DB:", err);
  });

// Routers
const userApp = require("./APIs/userApi");
const productApp = require("./APIs/productsApi");

app.use("/user-api", userApp);
app.use("/product-api", productApp);

// Health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Invalid path handler
app.use("*", (req, res) => {
  console.log(`Invalid path: ${req.originalUrl}`);
  res.status(404).send({ message: "Invalid path" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error middleware triggered:", err.message);
  res.status(500).send({ message: "Error occurred", errorMessage: err.message });
});
