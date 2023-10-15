const express = require('express');
const fs = require('fs');
const app = express();
const iceCream = require('./src/routes/ice-cream');
const PORT = 3030;


app.use(express.json());

app.use((req, res, next) => {
    const path = req.path; // Extracts the path
    const queryString = req.query; // Extracts the query string as an object
    const method = req.method; // Extracts the request method (GET, POST, etc.)

    console.log("Path:", path);
    console.log("Query String:", queryString);
    console.log("Method:", method);

    next(); // Move on to the next middleware or route handler
});

app.use(iceCream)

app.get('*', (req, res) => {
    const message = "Welcome To Chilly Delights\n\nMake unforgettable memories with our super chilly ice cream specialities.\nBring family and friends and enjoy some freezing moments.";
    res.status(200).send(message);
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});