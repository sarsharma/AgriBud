const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.listen(process.env.PORT||3000);

app.get("/", function (req, res) {
    res.type('html');
    res.sendFile(__dirname+"/index.html");
});
app.use(express.static(__dirname));



