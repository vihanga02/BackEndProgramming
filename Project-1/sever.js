const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./Middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(errorHandler)

const port = process.env.PORT || 3000;

app.use("/api/contacts", require("./Routes/contactRoutes.js"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})