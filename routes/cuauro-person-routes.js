/*
==============================================================================
; Title: cuauro-person-routes.js Web-420
; Author: Richard Krasso
; Modified by: Patrick Cuauro
; Bellevue University
; Date: 06 20 2023
; Description: Routes for Person web API
=================================================================================================================
*/
//imports with require statements
const express = require('express');
const router = express.Router();
//remember the ../ before the path to return a subfolder
const Person = require('../models/cuauro-person.js');

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: API for returning a list of person documents from MongoDB
 *     summary: returns list of person document
 *     responses:
 *       '200':
 *         description: Array of person
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/persons', async (req, res) => {
    try {
        Person.find({}, function (err, person) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    message: `MongoDB Exception: ${err}`
                })
            } else {
                console.log(person);
                res.json(person);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: `Server Exception: ${e.message}`,
        });
    }
});

/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     name: createPerson
 *     description: API for adding a new Person document to MongoDB Atlas
 *     summary: Creates a new person document
 *     requestBody:
 *       description: Persons information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *              roles:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         text:
 *                          type: string 
 *              dependents:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         firstName:
 *                          type: string
 *                         lastName:
 *                          type: string
 *              birthDate:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Person document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/persons", async (req, res) => {
    try {
      const newPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roles: req.body.roles,
        dependents: req.body.dependents,
        birthDate: req.body.birthDate
      };
  
      await Person.create(newPerson, function (err, person) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(person);
          res.json(person);
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        message: `Server Exception: ${e.message}`,
      });
    }
  });
module.exports = router;