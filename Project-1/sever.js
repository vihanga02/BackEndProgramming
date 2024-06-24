

const express = require("express");
const dotenv = require("dotenv").config();


const app = express();

const port = process.env.PORT || 3000;

app.use("/api/constacts", require("./Routes/contactRoutes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})