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

// DESTROY
app.delete("/pokemon/:id", (req, res) => {
    Pokemon.splice(req.params.id, 1);
    res.redirect("/pokemon");
  });

// UPDATE 
app.put("/pokemon/:id", (req, res) => {
    const updatePokemon = {
      name: req.body.name,
      img: req.body.img,
      type: req.body.type,
      stats: {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        spattack: req.body.sattack,
        spdefense: req.body.sdefense,
        speed: req.body.speed
      }
    };
    Pokemon[req.params.id] = updatePokemon;
    res.redirect(`/pokemon/${req.params.id}`);
  });

// EDIT 
app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", {
      aPokemon: Pokemon[req.params.id],
      index: req.params.id
    });
  });

// CREATE
app.post("/pokemon", (req, res) => {
    const newPokemon = {
      name: req.body.name,
      img: req.body.img,
      type: req.body.type,
      stats: {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        spattack: req.body.sattack,
        spdefense: req.body.sdefense,
        speed: req.body.speed
      }
    };
    Pokemon.push(newPokemon);
    res.redirect("/pokemon");
  });
  

// SHOW
app.get("/pokemon/:id", (req, res) => {
    res.render("show.ejs", {
      index: req.params.id,
      aPokemon: Pokemon[req.params.id]
    });
  });



// ***************************
// SERVER LISTENER
// ***************************

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))