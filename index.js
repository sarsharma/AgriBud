const express = require('express');
const db=require('./connect');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000);

//setting homepage

app.get("/", function (req, res) {
    res.type('html');
    res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname));

//user signup middleware
app.post("/signup", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;
    var email = req.body.email;
    
    //checking if the username is already taken
    var sql="Select * from users where username="+mysql.escape(username);
    
    db.query(sql, (err, result, field)=>{
        if (err) throw err;
        if(result.length){
             res.send("Username already exists");
        }
        else {
            var insertuser = "insert into users(username, email, password) values(? , ? , ? )";
            db.query(insertuser, [username, email, password], (error) => {
                if (error) throw error;
                else {
                    console.log("user inserted");
                    res.send("User created, login please");
                }
            })
        };
    });
})


