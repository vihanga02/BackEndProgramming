import express, { response } from "express";

const app = express();

const port = process.env.port || 3000; 

const  mockUsers = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Doe'}
];

app.get("/",(req, res) => {
    res.status(201).send("Hello World");
})

app.get('/api/users', (res, req) => {
    res.send(mockUsers)
})

app.get('/api/products', (res, req) =>{
    res.send([
        {id: 1, name: 'Product 1'},
        {id: 2, name: 'Product 2'}
    ])
})

app.get("/api/users/:id", (req, res) => {
    console.log(req.params.id);
    const parsId = parseInt(req.params.id);
    console.log(parsId);
    if (isNaN(parsId)){
        return res.status(400).send("Invalid ID supplied");
    }
    const findUser =  mockUsers.find((user) => user.id === parsId);
    if( !findUser){
        return res;
    }
    return response.send(findUser);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});