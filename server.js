// Setup empty JS object to act as endpoint for all routes
projectData = {animal:"lion", age:34};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors);

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log("Server listening on port: " + port);
});


// GET routes
app.get("/GetData", (req, res) => {
    res.send(projectData);
});

// POST routes
app.post("/PostData", (req, res) => {
    projectData.push(req.body);
    res.send("Post request done.");
});
