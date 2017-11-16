var express = require('express');
var app = express();
var sql = require('mssql');
var config = {
    user: 'user',
    password: 'Parola@123',
    server: '(LocalDb)',
    options: {
        instanceName: 'MSSQLLocalDB'
    },
    database: 'Books'
};

sql.connect(config, function (err) {
    //console.log('sql.connect begin');
    console.log(err);
    //console.log('sql.connect end');
});

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/books',
    Text: 'Book'
}, {
    Link: '/authors',
    Text: 'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');


app.use('/Books', bookRouter);

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