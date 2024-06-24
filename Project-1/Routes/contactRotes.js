const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
    res.send("Hello World");
}); 

router.route("/").post((req, res) => {
    res.status(200).json({data: "Create new contact"});
});

router.route("/:id").get((req, res) => {
    res.status(200).json({data: `Get contact for id: ${req.params.id}`});
})

router.route("/:id").put((req, res) => {
    res.status(200).json({data: `Update contact for id: ${req.params.id}`});
})

router.route("/:id").delete((req, res) => {
    res.status(200).json({data: `Delete contact for id: ${req.params.id}`});
})

module.exports = router;