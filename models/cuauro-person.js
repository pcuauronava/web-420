/*
==============================================================================
; Title: cuauro-person.js Web-420
; Author: Richard Krasso
; Modified by: Patrick Cuauro
; Bellevue University
; Date: 06 20 2023
; Description: Model for web API
=================================================================================================================
*/
"use-strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * role schema
 */
const roleSchema = new Schema({
    text: { type: String },
});
/**
 * dependent schema
 */
const dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String  }
});
/**
 * person schema
 */
const personSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    //roleSchema
    dependents: [dependentSchema],
    //dependentSchema
    birthDate: { type: String },
});
//export the model
module.exports = mongoose.model("Person",personSchema);