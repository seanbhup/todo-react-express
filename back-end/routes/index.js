var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "x",
    password: "x",
    database: "students"
})

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
