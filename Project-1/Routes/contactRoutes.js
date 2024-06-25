const express = require("express");
const router = express.Router();
const { getContacts, getContact, updateContact, deleteContact, createConstact } = require("../Contrallers/contactContraller");

router.route("/").get(getContacts).post(createConstact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;