const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

const createConstact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone ){
        res.status(400);
        throw new Error("Please provide name, email and phone");
    }
    const newContact = await Contact.create({
        name,
        email,
        phone
    });

    res.status(200).json(newContact);
});

const getContact = asyncHandler( async (req, res) => {
    const contact = await Contact.fnidById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler( async(req, res) => {
    const contact = await Contact.fnidById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );

    res.status(200).json(updateContact);
});

const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.fnidById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.remove();
    res.status(200).json(contact);
});




module.exports = { getContacts, createConstact, getContact, updateContact, deleteContact};