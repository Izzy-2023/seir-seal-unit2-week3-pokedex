const express    = require('express');
const app        = express();
const morgan = require("morgan") // logger
const Pokemon    = require('./models/pokemon');
const { PORT = 3013 } = process.env;

// *************************
// Routes
// *************************

// INDEX
app.get('/', (req, res) => {
res.render('index.ejs', { data: Pokemon });
});


// SHOW
app.get('/:id', (req, res) => {
res.render('show.ejs', { data: Pokemon[req.params.id] });
});


// ***************************
// SERVER LISTENER
// ***************************

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))