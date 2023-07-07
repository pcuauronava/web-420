/*
==============================================================================
; Title: cuauro-customer.js Web-420
; Author: Richard Krasso
; Modified by: Patrick Cuauro
; Bellevue University
; Date: 07 06 2023
; Description:
=================================================================================================================
*/
"use-strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * lineItem schema
 */
let lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});
/**
 * invoice schema
 */
let invoiceSchema = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema],
});
/**
 * customer schema
 */
let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema],
});
//export the model
module.exports = mongoose.model("Customer", customerSchema);