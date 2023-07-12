/*
==============================================================================
; Title: cuauro-composer-routes.js Web-420
; Author: Richard Krasso
; Modified by: Patrick Cuauro
; Bellevue University
; Date: 06 13 2023
; Description: Composer api document
=================================================================================================================
*/
//imports with require statements
const express = require('express');
const router = express.Router();
//remember the ../ before the path to return a subfolder
const Composer = require('../models/cuauro-composer.js');

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: Array of composers documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/composers', async (req, res) => {
    try {
        Composer.find({}, function (err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`,
        });
    }
});

/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/composers/:id', async (req, res) => {
    try {
        Composer.findOne({ '_id': req.params.id }, function (err, composer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: `MongoDB Exception: ${err}`,
                });
            } else {
                console.log(Composer);
                res.json(composer);
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
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding a new composer document to MongoDB Atlas
 *     summary: Creates a new composer document
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/composers", async (req, res) => {
    try {
      const newComposer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
  
      await Composer.create(newComposer, function (err, composer) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(composer);
          res.json(composer);
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
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     name: updateComposerById
 *     description: API for updating composer document
 *     summary: updates a composer document using a composer id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Array of composer documents
 *       '401':
 *         description: Invalid composerId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.put("/composers/:id", async (req, res) => {
  try {
    console.log(req.body);
    Composer.findOne({ _id: req.params.id }, function (err, composer) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(composer);

        if (composer) {
          console.log(req.body);
          composer.set({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          });
          composer.save(function (err, savedComposer) {
            if (err) {
              console.log(err);
              res.status(501).send({
                message: `MongoDB Exception: ${err}`,
              });
            } else {
              console.log(savedComposer);
              res.status(200).send({
                message: savedComposer,
              });
            }
          });
        } else {
          console.log("Invalid composerId");
          res.status(401).send({
            message: `Invalid composerId`,
          });
        }
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
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     name: updateComposerById
 *     description: API for updating composer document to MongoDB Atlas
 *     summary: updates a new composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of composer documents
 *       '401':
 *         description: Invalid composerId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete("/composers/:id", async (req, res) => {
  try {
    Composer.findByIdAndDelete(
      { _id: req.params.id },
      function (err, composer) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(composer);
          res.status(200).send({
            message: composer,
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});
module.exports = router;