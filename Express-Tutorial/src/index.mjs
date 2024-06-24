import express from "express";
import { body, query, validationResult, checkSchema } from "express-validator";
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";
import { usersRouter } from "./routes/users.mjs";
import { mockUsers } from "./utils/constants.mjs";

const app = express();
app.use(express.json());
app.use(usersRouter);

const port = process.env.PORT || 3000;

function middleWare(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

const resolveIndexById = (req, res, next) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.status(400).send("Invalid ID supplied");
    }
    const userIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }
    req.userIndex = userIndex;
    next();
}

app.use(middleWare); // Apply middleware globally

app.get("/", (req, res) => {
    res.status(201).send("Hello World");
});

app.get('/api/products', (req, res) => {
    res.send([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' }
    ]);
});

app.get("/api/users/:id", resolveIndexById, (req, res) => {
    res.send(mockUsers[req.userIndex]);
});

app.put('/api/users/:id', resolveIndexById, (req, res) => {
    mockUsers[req.userIndex] = { id: parseInt(req.params.id), ...req.body };
    res.sendStatus(200);
});

app.patch('/api/users/:id', resolveIndexById, (req, res) => {
    mockUsers[req.userIndex] = { ...mockUsers[req.userIndex], ...req.body };
    res.sendStatus(200);
});

app.delete('/api/users/:id', resolveIndexById, (req, res) => {
    mockUsers.splice(req.userIndex, 1);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
