/*
==============================================================================
; Title: cuauro-session-routes.js Web-420
; Author: Richard Krasso
; Modified by: Patrick Cuauro
; Bellevue University
; Date: 06 28 2023
; Description: Model for web API
=================================================================================================================
*/
//imports with require statements
const express = require('express');
const router = express.Router();
//remember the ../ before the path to return a subfolder
const User = require('../models/cuauro-user.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
//Operations
//signup
//login
/**
 * signup
 * @openapi
 * /api/signup:
 *  post:
 *      tags:
 *          - User
 *      description: API for signup process
 *      summary: requires the data for signup
 *      requestBody:
 *       description: Signup information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *              userName:
 *                  type: string
 *              password:
 *                  type: string
 *              emailAddress:
 *                  type: string
 *      responses:
 *        '200':
 *         description: Registered user
 *        '401':
 *         description: Username is already in use
 *        '500':
 *         description: Server Exception
 *        '501':
 *         description: MongoDB Exception   
 */
router.post('/signup', async (req, res) => {
    try {

        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const newRegisteredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            emailAddress: req.body.emailAddress,
        };
    
        await User.create(newRegisteredUser, function (err, password) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    message: `MongoDB Exception: ${err}`,
                });
            } else {
                console.log(password);
                res.json(password);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: `Server Exception: ${e.message}`,
        });
    }
});
/**
 * login
 * @openapi
 * /api/login:
 *  post:
 *      tags:
 *          - User
 *      description: API for logging process
 *      summary: authorize the user to login
 *      requestBody:
 *       description: user verification info to login
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *              userName:
 *                  type: string
 *              password:
 *                  type: string
 *      responses:
 *        '200':
 *         description: Successful login
 *        '401':
 *         description: Invalid username and/or password combination
 *        '500':
 *         description: Server Exception
 *        '501':
 *         description: MongoDB Exception   
 */

router.post("/login", async (req, res) => {
    try {
      User.findOne({ userName: req.body.userName }, function (err, user) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(user);
          if (user) {
            let passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password,
            );
  
            if (passwordIsValid) {
              console.log("User logged in");
              res.status(200).send({
                message: "User logged in",
              });
            } else {
              console.log("Invalid username and/or password combination");
              res.status(401).send({
                message: `Invalid username and/or password combination`,
              });
            }
          }
          if (!user) {
            console.log("Invalid username and/or password combination");
            res.status(401).send({
              message: `Invalid username and/or password combination`,
            });
          }
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        message: `Server Exception: ${e}`,
      });
    }
  });
module.exports = router;