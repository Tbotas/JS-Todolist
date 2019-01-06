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

    postNewTodo(p) {
        const query = `INSERT INTO todos VALUES (?, ?, DATETIME('now'), NULL, ?);`
        return db.run(query, [p.message, p.completion, p.userId])
    },

    deleteRessource(ressource, id) {
        const query = `DELETE FROM ${ressource}s WHERE ${ressource}_id = ?;`
        return db.run(query, [id])
    }
}


