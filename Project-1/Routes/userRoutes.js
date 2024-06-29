const express =  require("express");
const validateToken = require("../Middleware/validateTokenHandler.js");
const { registerUser, loginUser, getCurrentUser } = require("../Controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, getCurrentUser)

module.exports = router;