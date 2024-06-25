const asyncHandler = require("express-async-handler");
const contact = require("../models/contactModel");

const getContacts = asyncHandler( async (req, res) => {
    const contacts = await contact.find();
    res.status(200).json(contacts);
});

const createConstact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone ){
        res.status(400);
        throw new Errpr("Please provide name, email and phone");
    }
    res.status(200).json({data: "Create new contact"});
});

const getContact = asyncHandler( async (req, res) => {
    res.status(200).json({data: `Get contact for id: ${req.params.id}`});
});

const updateContact = asyncHandler( async(req, res) => {
    res.status(200).json({data: `Update contact for id: ${req.params.id}`});
});

const deleteContact = asyncHandler( async (req, res) => {
    res.status(200).json({data: `Delete contact for id: ${req.params.id}`});
});




module.exports = { getContacts, createConstact, getContact, updateContact, deleteContact};