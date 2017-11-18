var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/books',
    Text: 'Book'
}, {
    Link: '/authors',
    Text: 'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render (ejs)',
        nav: nav
    });
});

app.get('/books', function (req, res) {
    res.send('Hello Books!');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});