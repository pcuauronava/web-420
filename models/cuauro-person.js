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
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * role schema
 */
const roleSchema = new Schema({
    // don't forget String is spelled with Capital S
    // in this case the values can not be unique because is an appointment!
    text: { type: String, required:true },
});
/**
 * dependent schema
 */
const dependentSchema = new Schema({
    firstName: { type: String, required:true },
    lastName: { type: String, required:true  }
});
/**
 * person schema
 */
const personSchema = new Schema({
    firstName: { type: String, required:true },
    lastName: { type: String, required:true  },
    roles: [roleSchema],
    //roleSchema
    dependents: [dependentSchema],
    //dependentSchema
    birthDate: { type: String },
});
//export the model
module.exports = mongoose.model("Person",personSchema);