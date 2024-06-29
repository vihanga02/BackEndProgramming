const express = require("express");
const router = express.Router();
const { getContacts, getContact, updateContact, deleteContact, createConstact } = require("../Controllers/contactContraller");
const validatetoken = require("../Middleware/validateTokenHandler");

router.use(validatetoken);

router.route("/").get(getContacts).post(createConstact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;