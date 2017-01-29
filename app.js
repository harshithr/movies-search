var express = require("express");
var app = express();
var request = require("request");

var port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/results", function(req, res){
    var name = req.query.search;
    request("http://www.omdbapi.com/?s=" + name, function(error, response, body){
        if(!error && response.statusCode === 200){
            var parsedJson = JSON.parse(body);
            res.render("results", {data: parsedJson});
        }
    });
});

app.listen(port);
