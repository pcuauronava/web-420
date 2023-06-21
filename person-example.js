/**
	Title: users.js
    Author: Professor Krasso
    Date: 11 August 2022
    Description: MongoDB Shell Scripts for the users collection.
 */

/**
 * Person document clean-up. 
 */
 db.person.deleteOne({"firstName": "Alberto"})
 db.person.deleteOne({"firstName": "Elon"})
 db.person.deleteOne({"firstName": "Jordan"})
 
 /**
  * Create User documents. 
  */
 mansueti =  {
    "firstName": "Alberto",
    "lastName": "Mansueti",
    "roles": [
      {
        "text": "user"
      }
    ],
    "dependents": [
      {
        "firstName": "Patrick",
        "lastName": "Cuauro"
      }
    ],
    "birthDate": "11-11-1955"
  }

  musk = {
    "firstName": "Elon",
    "lastName": "Musk",
    "roles": [
      {
        "text": "admin"
      }
    ],
    "dependents": [
      {
        "firstName": "Patrick",
        "lastName": "Cuauro"
      }
    ],
    "birthDate": "06-12-1975"
  }
  
  peterson =  {
    "firstName": "Jordan",
    "lastName": "Peterson",
    "roles": [
      {
        "text": "user"
      }
    ],
    "dependents": [
      {
        "firstName": "Paul",
        "lastName": "Cuauro"
      }
    ],
    "birthDate": "03-04-1965"
  }
 
 /**
  * Insert the newly created user documents.
  */
 db.person.insertOne(mansueti)
 db.person.insertOne(musk)
 db.person.insertOne(peterson)