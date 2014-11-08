var express = require('express');
var app = express();
var util = require('util');
var fs = require('fs');
var questions = "questions.json";

app.use(express.static('app'));
app.set('views', (__dirname, 'app/views'));
app.set('view engine', 'jade');

app.get('/fit', function(req, res){
    res.render('index');
});

// Json response for specific question
app.get('/question/:id', function(req, res){
    var id = req.params.id;
    fs.readFile(questions, 'utf8', function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        if (id) {
            //retrieve the question at array index
            data = data[id-1];
        }
        res.send(data);
    });
});

// Creates a json for all the questions that will help determine company fit
app.get('/questions', function(req, res){
    fs.readFile(questions, 'utf8', function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        res.json(data);
    });
});

var port = Number(process.env.PORT || 2000);
app.listen(port, function() {
  console.log("Listening on " + port);
});