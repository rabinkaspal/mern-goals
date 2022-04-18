const path = require("path");
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
// app.use("/", (req, res) => res.send({ message: "Invalid route." }));

//serve frontend if in production env
if (process.env.NODE_ENV === "production") {
    //folder of frontend
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    //redirect all routes to index.html for frontend
    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => res.send("Set NODE_ENV to production"));
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
