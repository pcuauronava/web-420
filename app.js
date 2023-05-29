/*
==============================================================================
; Title: app.js Web-420
; Author: Patrick Cuauro
; Bellevue University
; Date: 05 28 2023
;
=================================================================================================================
*/
"use-strict";
//imports with require statements
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");

//app variable
const app = express();

// const conn =

app.set("port", process.env.PORT || 3000);


const conn =
"mongodb+srv://web420_admin:aslan123@bellevueuniversity.5jww2it.mongodb.net/web340DB?retryWrites=true&w=majority";
mongoose
  .connect(conn, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });

// setting app to use express.json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// object literal
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

// assigning a variable to call swaggerJsdoc
const openapiSpecification = swaggerJsdoc(options);

// wire openapiSpecification to app variable
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

//creating our http server on the port number
http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});