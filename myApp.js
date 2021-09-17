var express = require('express');
var app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

app.use(bodyParser.urlencoded({extended: true}));

console.log('Hello World');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    console.log('Hello Express');
    // res.send('Hello Express');
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
    res.json(process.env.MESSAGE_STYLE == 'uppercase' ? {"message": "HELLO JSON"} : {"message": "Hello json"});
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({"time": req.time});
});

app.get('/:word/echo', (req, res) => {
    res.json({"echo": req.params.word});
});

app.route('/name').get((req, res) => {
    res.json({'name': req.query.first + ' ' + req.query.last});
}).post((req, res) => {
    res.redirect('/name?first='+req.body.first+'&last='+req.body.last);
});

 module.exports = app;
