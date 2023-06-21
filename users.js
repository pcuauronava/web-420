/**
	Title: users.js
    Author: Professor Krasso
    Date: 11 August 2022
    Description: MongoDB Shell Scripts for the users collection.
 */

/**
 * User document clean-up. 
 */
db.composers.deleteOne({"email": "jbach@me.com"})
db.composers.deleteOne({"email": "lbeethoven@me.com"})
db.composers.deleteOne({"email": "wmozart@me.com"})
db.composers.deleteOne({"email": "jbrahms@me.com"})
db.composers.deleteOne({"email": "rwagner@me.com"})
db.composers.deleteOne({"email": "cdebussy@me.com"})

/**
 * Create six User documents. 
 */
bach = {
	"firstName": "Johann",
	"lastName": "Bach",
	"employeeId": "1007",
	"email": "jbach@me.com",
	"dateCreated": new Date()
}

ludwig = {
	"firstName": "Ludwig",
	"lastName": "Beethoven",
	"employeeId": "1008",
	"email": "lbeethoven@me.com",
	"dateCreated": new Date()
}

mozart = {
	"firstName": "Wolfgang",
	"lastName": "Mozart",
	"employeeId": "1009",
	"email": "wmozart@me.com",
	"dateCreated": new Date()
}

brahms = {
	"firstName": "Johannes",
	"lastName": "Brahms",
	"employeeId": "1010",
	"email": "jbrahms@me.com",
	"dateCreated": new Date()
}

wagner = {
	"firstName": "Richard",
	"lastName": "Wagner",
	"employeeId": "1011",
	"email": "rwagner@me.com",
	"dateCreated": new Date()
}

debussy = {
	"firstName": "Claude",
	"lastName": "Debussy",
	"employeeId": "1012",
	"email": "cdebussy@me.com",
	"dateCreated": new Date()
}

/**
 * Insert the newly created user documents.
 */
db.composers.insertOne(bach)
db.composers.insertOne(ludwig)
db.composers.insertOne(mozart)
db.composers.insertOne(brahms)
db.composers.insertOne(wagner)
db.composers.insertOne(debussy)