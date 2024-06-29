const express =  require("express");
const { registerUser, loginUser, getCurrentUser } = require("../Controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", getCurrentUser)

module.exports = router;