let db = require('./DBModule.js')

module.exports = {
    getAllFromRessource(ressource) {
        const query = `SELECT * FROM ${ressource}s;`
        return db.run(query)
    },

    getSingleFromRessource(ressource, id) {
        const query = `SELECT * FROM ${ressource}s WHERE ${ressource}_id = ?;`
        return db.run(query, [id])
    },

    getAllTodoFromUser(userID) {
        const query = `SELECT * FROM todos WHERE user_id = ?;`
        return db.run(query, [userID])
    },

    postNewTodo(p) {
        const query = `INSERT INTO todos VALUES (NULL, ?, ?, DATETIME('now'), NULL, ?);`
        return db.run(query, [p.message, p.completion, p.userId])
    },

    postNewUser(p, password) {

        const query = `INSERT INTO users VALUES (NULL, ?, ?, ?, ?, ?, DATETIME('now'), NULL);`
        return db.run(query, [p.message, p.completion, p.userId])
        
    },

    deleteRessource(ressource, id) {
        const query = `DELETE FROM ${ressource}s WHERE ${ressource}_id = ?;`
        return db.run(query, [id])
    }
}


