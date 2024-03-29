// ***********************************
// Dependecies
// ***********************************
require('dotenv').config(); // this is how we make use of our .env variables
const express = require('express');
const mongoose = require("mongoose")
const app = express();
const morgan = require("morgan") // logger
const methodOverride = require("method-override")

const { PORT = 3000 } = process.env;



// Bring in our model
const Pokemon = require('./models/pokemon');

// ***************************
// MIDDLEWARE
// ***************************

app.use((req, res, next) => {
    req.model = {
       Pokemon,

    }
        console.log("this is middleware")
        // go to the next app method
        next()
    })



app.use(morgan("dev")) // logging
app.use(express.urlencoded({ extended: true })) // body parser, this is how we get access to req.body
app.use(methodOverride("_method")) // lets us use DELETE PUT HTTP verbs
app.use("/public", express.static("public")) // server up our public directory 

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
        spattack: req.body.spattack,
        spdefense: req.body.spdefense,
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
        spattack: req.body.spattack,
        spdefense: req.body.spdefense,
        speed: req.body.speed
      }
    };
    Pokemon.push(newPokemon);
    res.send(newPokemon);
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