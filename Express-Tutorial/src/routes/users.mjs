import { Router } from 'express';
import { query, validationResult, checkSchema } from 'express-validator';
import { mockUsers } from '../utils/constants.mjs';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router();

router.get('/api/users',
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

router.post('/api/users', 
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

export const usersRouter = router;
