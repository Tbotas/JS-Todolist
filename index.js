#!/usr/bin/env node

const express = require('express')
const bodyParser = require('body-parser')


let app = express()
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './vues')
app.set('view engine', 'ejs');




// Start the server
app.listen(PORT, () => {
    console.log('Serveur démarré sur le port ', PORT)
})