const asyncHandler = require("express-async-handler");
const User = require("../models/userModal.js")

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if ( !username || !email || !password ) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    res.json({messege: "Register route"});
})

const loginUser = asyncHandler(async (req, res) => {
    res.json({messege: "Login route"});
})

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({messege: "Current route"});
})

module.exports = { registerUser, loginUser, getCurrentUser};