/*
==============================================================================
; Title: cuauro-user.js Web-420
; Author: Richard Krasso
; Modified by: Patrick Cuauro
; Bellevue University
; Date: 06 28 2023
; Description: Model for web API
=================================================================================================================
*/
"use-strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * role user
 */
let userSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    emailAddress: { type: String },
});
//export the model
module.exports = mongoose.model("User",userSchema);