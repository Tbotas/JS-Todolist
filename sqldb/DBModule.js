const sqlite3 = require('sqlite3')

const DBname = "projet.sql"

class DBModule {
    constructor() {
        this.db = new sqlite3.Database(DBname, (err) => {
            if (err) {
                throw err
            }
        })
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err, rows) => {
                if (err) {
                    console.error("[ERROR] Error lors de la commande sql : " + sql)
                    console.error(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

db = new DBModule()

db.run(`CREATE TABLE IF NOT EXISTS todos (todo_id INTEGER PRIMARY KEY, 
    message TEXT, 
    completion TEXT,
    updatedAt TEXT,
    createdAt TEXT,
    userId INTEGER)`)

db.run(`CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY, 
    lastname TEXT, 
    username TEXT,
    password TEXT,
    email TEXT,
    updatedAt TEXT,
    createdAt TEXT,)`)

module.exports = db