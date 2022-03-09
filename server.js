///////////////////////////////////////////
// import dependencies
///////////////////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
// we'll also import our fruits model when we have it
const Fruit = require('./models/fruit')

///////////////////////////////////////////
// Create our express application object
///////////////////////////////////////////
const app = require('liquid-express-views')(express())

///////////////////////////////////////////
// Middleware
///////////////////////////////////////////
// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlcoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))

///////////////////////////////////////////
// Routes
///////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('the app is running, better go catch it')
})



///////////////////////////////////////////
// Server Listener
///////////////////////////////////////////
const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})