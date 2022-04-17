const express = require("express");
const { errorHandler } = require("../middleware/errorMiddleware");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;
const goalRoutes = require("./routes/goalRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/", (req, res) => res.send({ message: "Invalid route." }));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
