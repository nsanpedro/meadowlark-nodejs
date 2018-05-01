var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();



var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main'
});

////handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

////port & public
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));


///// test querystring
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});


////ROUTES Get for home/about/notfount/server error
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res) {
   res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
   res.render('tours/request-group-rate');
});


app.use(function (req, res, next) {
    res.status(404);
    res.send('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.send('500');
});


////Creating the webserver
app.listen(app.get('port'), function () {
    console.log('Express started on localhost: ' + app.get('port') + ' press Ctrl-C to terminate the server');
});
