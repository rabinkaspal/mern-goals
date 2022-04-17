const asyncHandler = require("express-async-handler");

//@desc     Get goals
//@route    GET /api/goals
//@access   Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get goals" });
});

//@desc     Get goals
//@route    POST /api/goals
//@access   Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Goal text is required");
    }
    res.status(200).json({ message: "Set goal" });
});

//@desc     Get goals
//@route    PUT /api/goals
//@access   Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
});

//@desc     Get goals
//@route    DELETE /api/goals
//@access   Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
