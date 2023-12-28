// ***********************************
// Dependecies
// ***********************************
require('dotenv').config(); // this is how we make use of our .env variables
require("./config/db") // bring in our db config
const express = require('express');
const morgan = require("morgan") // logger
const methodOverride = require("method-override")
const app = express();
const { PORT = 3013 } = process.env;

const mongoose = require("mongoose")

// Bring in our model
const Pokemon = require('./models/pokemon');

// ***************************
// MIDDLEWARE
// ***************************

app.use((req, res, next) => {
    req.model = {
        Pokemon

    }
        console.log("this is middleware")
        // go to the next app method
        next()
    })



app.use(morgan("dev")) // logging
app.use(express.urlencoded({ extended: true })) // body parser, this is how we get access to req.body
app.use(methodOverride("_method")) // lets us use DELETE PUT HTTP verbs

// *************************
// Routes
// *************************


// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { data: Pokemon})
});

// NEW
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs', {Pokemon})
});

// SHOW
app.get('/pokemon/show', (req, res) => {
    res.render('show.ejs', { Pokemon })
});




// ***************************
// SERVER LISTENER
// ***************************

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))