# HAY Théo et PALLARD Corentin

06/01/2019

## Lancer serveur

node .

## Prérequis

* Si ce n'est pas fait, installer NodeJS version 10.0.0+
* Faire la commande:
	`npm install`

## Routes

* http://localhost:8080/todos Afficher todos
* http://localhost:8080/users Afficher users
* http://localhost:8080/todos/add Ajouter todo
* http://localhost:8080/todos/:todoId Afficher une todo
* http://localhost:8080/todos/:todoId/edit Editer une todo
* http://localhost:8080/users/add Ajouter un user
* http://localhost:8080/users/:userId Afficher un user
* http://localhost:8080/users/:userId/edit Editer un user
* http://localhost:8080/users/:userId/todos Afficher todos d'un user

## Librairies

* Express
* body-parser
* ejs
* sqlite3
* bcryptjs