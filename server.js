const express = require("express");
const mongoose = require("mongoose");
const tradeRoutes = require("./routes/tradeRoutes"); // Ensure this path is correct
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api", tradeRoutes); // This line should work correctly now

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
