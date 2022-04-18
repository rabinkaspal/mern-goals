const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//@desc     Register User
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            _id: user._id,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc     Authenticate user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        throw new Error("Invalid credentials");
    }
});

//@desc     Get current user data
//@route    GET /api/users/me
//@access   Private
const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({ id: _id, name, email });
});

const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};
