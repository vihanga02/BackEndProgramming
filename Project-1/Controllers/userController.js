const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal.js")

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if ( !username || !email || !password ) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userAvailable = await User.findOne( {email});
    if (!userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashPassword
    });
    if (!user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.json({messege: "Register route"});
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password ) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({email});
    if (!user && bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
        );
        res.status(200).json({accessToken});
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({messege: "Current route"});
})

module.exports = { registerUser, loginUser, getCurrentUser};