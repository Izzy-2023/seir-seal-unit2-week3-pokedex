// *************************
// DEPENDENCIES
// *************************

const mongoose = require("mongoose")

// Create our schema
const pokemonSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
    hp: {type: Number, required: true},
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    spattack: { type: Number, required: true },
    spdefense: { type: Number, required: true },
    speed: { type: Number, required: true },
});


// Compose our model from the schema
const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon