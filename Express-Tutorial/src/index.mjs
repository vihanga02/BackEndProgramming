import express from "express";
import { body, query, validationResult, checkSchema } from "express-validator";
import { createUserValidationSchema } from "./utils/validationSchemas";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, name: 'John Doe', displayName: 'John' },
    { id: 2, name: 'Jane Doe', displayName: 'Jane' },
    { id: 3, name: 'Alice Paka', displayName: 'Alice' },
    { id: 4, name: 'Bob Doe', displayName: 'Bob' }
];

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

app.get('/api/users', 
    query('filter').optional().isString().notEmpty().withMessage('Filter must be a non-empty string'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { filter, value } = req.query;
        if (filter && value) {
            return res.send(
                mockUsers.filter((user) => user[filter].includes(value))
            );
        }
        return res.send(mockUsers);
    }
);

app.post('/api/users', 
    checkSchema(createUserValidationSchema),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, name: req.body.name };
        mockUsers.push(newUser);
        res.status(200).send("User added");
    }
);

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
