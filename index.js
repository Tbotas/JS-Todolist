#!/usr/bin/env node

const express = require('express')
const bodyParser = require('body-parser')
const databaseModel = require('./sqldb/databaseModel.js')
const bcrypt = require('bcryptjs')

let app = express()
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs');


requestError = (route, res, err, redirect = false) => {
    res.format({
        html: () => {
            if (redirect)
                res.redirect(301, route)
            else
                res.render(route)
        },
        json: () => {
            res.status(500)
            res.json({message: "Internal Server Error", error: err})
        }
    })
}

// todos routes

app.get('/todos/add', (req, res) => {
    res.render('todos/form.ejs')
})

app.get('/todos', (req, res) => {
    databaseModel.getAllFromRessource('todo')
        .then((rows) => {
            res.format({
                html: () => {
                    res.render('todos/index.ejs', {
                        todos: rows
                    })
                },
                json: () => {
                    res.status(200)
                    res.json(rows)
                }
            })
        })
        .catch((err) => {
            requestError('todos/index.ejs', res, err)
        })
})

app.get('/todos/:id', (req, res) => {
    databaseModel.getSingleFromRessource('todo')
        .then((rows) => {
            res.format({
                html: () => {
                    res.render('todos/show.ejs')
                },
                json: () => {
                    res.status(200)
                    res.json(rows)
                }
            })
        })
        .catch((err) => {
            requestError('todos/show.ejs', res, err)
        })
})

app.post('/todos', (req, res) => {
    databaseModel.postNewTodo(req.params)
        .then(() => {
            res.format({
                html: () => {
                    res.redirect(301, '/todos')
                },
                json: () => {
                    res.status(200)
                    res.json({message: "success"})
                }
            })
        })
        .catch((err) => {
            requestError('/todos', res, err, true)
        })
})

app.get('/todos/:id/edit', (req, res) => {
    res.render('todos/form.ejs')
})

app.delete('/todos/:id', (req, res) => {
    databaseModel.deleteRessource('todo', req.params.id)
        .then(() => {
            res.format({
                html: () => {
                    res.redirect(301, '/todos')
                },
                json: () => {
                    res.status(200)
                    res.json({message: "success"})
                }
            })
        })
        .catch((err) => {
            requestError('/todos', res, err, true)
        })
})





// users routes

app.get('/users/add', (req, res) => {
    console.log("oui");
    res.render('users/form.ejs')
})

app.get('/users', (req, res) => {
    databaseModel.getAllFromRessource('user')
        .then((rows) => {
            res.format({
                html: () => {
                    res.render('users/index.ejs')
                },
                json: () => {
                    res.status(200)
                    res.json(rows)
                }
            })
        })
        .catch((err) => {
            requestError('users/index.ejs', res, err)
        })
})

app.get('/users/:id/edit', (req, res) => {
    res.render('users/form.ejs')
})

app.get('/users/:id/todos', (req, res) => {
    databaseModel.getAllTodoFromUser(req.params.id)
    .then(() => {
        res.format({
            html: () => {
                res.render('todos/index.ejs')
            },
            json: () => {
                res.status(200)
                res.json({message: "success"})
            }
        })
    })
    .catch((err) => {
        requestError('/users', res, err, true)
    })
})

app.get('/users/:id', (req, res) => {
    databaseModel.getSingleFromRessource('user')
        .then((rows) => {
            res.format({
                html: () => {
                    res.render('users/show.ejs')
                },
                json: () => {
                    res.status(200)
                    res.json(rows)
                }
            })
        })
        .catch((err) => {
            requestError('users/show.ejs', res, err)
        })
})

app.post('/users', (req, res) => {
    bcrypt.hash(req.params.password, 10, function(err, hash) {
        databaseModel.postNewTodo(req.params, hash)
            .then(() => {
                res.format({
                    html: () => {
                        res.redirect(301, '/users')
                    },
                    json: () => {
                        res.status(200)
                        res.json({message: "success"})
                    }
                })
            })
            .catch((err) => {
                requestError('/users', res, err, true)
            })
    });
    
})

app.delete('/users/:id', (req, res) => {
    databaseModel.deleteRessource('user', req.params.id)
        .then(() => {
            res.format({
                html: () => {
                    res.redirect(301, '/users')
                },
                json: () => {
                    res.status(200)
                    res.json({message: "success"})
                }
            })
        })
        .catch((err) => {
            requestError('/users', res, err, true)
        })
})








// Start the server
app.listen(PORT, () => {
    console.log('Serveur démarré sur le port', PORT)
})