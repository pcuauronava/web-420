const { Mongoose } = require("mongoose");

/*
==============================================================================
; Title: cuauro-composer.js Web-420
; Author: Richard Krasso
; Modified by: Patrick Cuauro
; Bellevue University
; Date: 06 13 2023
; Description:
=================================================================================================================
*/
const mongoose = require("mongoose");
const Schema = require("mongoose.Schema");
const composerSchema = new Schema({
    // don't forget String is spelled with Capital S
    // in this case the values can not be unique because is an appointment!
    firstName: { type: String, required:true },
    lastName: { type: String, required:true  }
});
//export the model
module.exports = mongoose.model("Composer", composerSchema);