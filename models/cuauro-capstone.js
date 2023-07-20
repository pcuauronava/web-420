/*
==============================================================================
; Title: cuauro-capstone.js Web-420
; Author: Richard Krasso
; Modified by: Patrick Cuauro
; Bellevue University
; Date: 07 18 2023
; Description: Team model - capstone project 
=================================================================================================================
*/
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
// Player Schema
let playerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  salary: { type: Number },
});

// Team schema
let teamSchema = new Schema({
  name: { type: String },
  mascot: { type: String },
  players: [playerSchema],
});

module.exports = mongoose.model("Teams", teamSchema);