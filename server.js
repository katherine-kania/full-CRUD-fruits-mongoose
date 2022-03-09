///////////////////////////////////////////
// import dependencies
///////////////////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
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

app.get("/fruits/seed", (req, res) => {
    // array of starter fruits
    const startFruits = [
        { name: 'Orange', color: 'orange', readyToEat: false },
        { name: 'Grape', color: 'purple', readyToEat: false },
        { name: 'Banana', color: 'orange', readyToEat: false },
        { name: 'Strawberry', color: 'red', readyToEat: false },
        { name: 'Coconut', color: 'brown', readyToEat: false },
    ]

    // when we seed data, there are a few steps involved 
    // delete all the data that already exists (will only happen if data exists)
    Fruit.remove({})
        .then(data => {
            console.log('this is what remove returns', data)
            // then we create with our seed data
            Fruit.create(startFruits)
                .then(data => {
                    console.log('this is what creat returns data', data)
                    res.send(data)
                })
        })


})




///////////////////////////////////////////
// Server Listener
///////////////////////////////////////////
const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})