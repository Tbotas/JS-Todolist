#!/usr/bin/env node

const express = require('express')
const bodyParser = require('body-parser')


let app = express()
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs');


// All the routes

app.get('/todos', (req, res, next) => {
    res.format({
        html: () => {
            res.render('todos/index.ejs')
        },
        json: () => {
            res.status(200)
            res.send({message: "success"}).end()
        }
    })

})



// Start the server
app.listen(PORT, () => {
    console.log('Serveur démarré sur le port', PORT)
})