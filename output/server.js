const open = require('open');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;
const localhost = `http://localhost:${PORT}`

// Sets up Express app to load static files from 'public'
// app.use(express.static(path.join('public')));
// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//========= Routes ========
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"./team.html"))
});

//Starts server 
app.listen(PORT, () => {
    console.log(`Server running at ${localhost}`);
    open(localhost);
});

