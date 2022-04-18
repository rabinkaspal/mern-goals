const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Please enter your email"],
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
