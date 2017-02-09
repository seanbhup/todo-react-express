var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/config.js");
var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

connection.connect();

router.get("/getStudents", (req,res,next)=>{
    connection.query("select * from students", (error,results,fields)=>{
        if (error) throw error;
        res.json(results)
    });
});

router.post("/addStudent", (req,res,next)=>{
    var studentToAdd = req.body.name;
    connection.query("insert into students (name) values (?)", studentToAdd, (error,results,fields)=>{
        if (error) throw error
        connection.query("select * from students", (error,results,fields)=>{
            if (error) throw error;
            res.json(results)
        });
    })
})

module.exports = router;
