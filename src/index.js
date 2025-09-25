const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = [];

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required fields. Please make sure both are provided in your request body."})
    }

    const newUser = {
        id: uuidv4(),
        name: name,
        email: email
    }

    users.push(newUser);
    return res.status(201).json(newUser);
});

app.get("/users/:id", (req, res) => {
   const userID = req.params.id;

   const user = users.find(u => u.id === userID);
   if (!user){
        return res.status(404).json({ "error": "User not found."});
   }

   res.json(user);
});

app.put("/users/:id", (req, res) => {
    const userID = req.params.id;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required fields. Please make sure both are provided in your request body."})
    }

    const userIdx = users.findIndex(u => u.id === userID);
    if (userIdx === -1){
        return res.status(404).json({ "error": "User not found."});
    }

    users[userIdx] = {
        id: userID,
        name: name,
        email: email
    }

    res.json(users[userIdx]);
})

app.delete("/users/:id", (req, res) => {
    const userID = req.params.id;

    const userIdx = users.findIndex(u => u.id === userID);
    if (userIdx === -1){
        return res.status(404).json({ "error": "User not found."});
    }

    users.splice(userIdx, 1);
    res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing