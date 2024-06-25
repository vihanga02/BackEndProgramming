const getContacts = (req, res) => {
    res.status(200).json({data: "Get all contacts"});
};

const createConstact = (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone ){
        res.status(400);
        throw new Errpr("Please provide name, email and phone");
    }
    res.status(200).json({data: "Create new contact"});
};

const getContact = (req, res) => {
    res.status(200).json({data: `Get contact for id: ${req.params.id}`});
};

const updateContact = (req, res) => {
    res.status(200).json({data: `Update contact for id: ${req.params.id}`});
};

const deleteContact = (req, res) => {
    res.status(200).json({data: `Delete contact for id: ${req.params.id}`});
}




module.exports = { getContacts, createConstact, getContact, updateContact, deleteContact};