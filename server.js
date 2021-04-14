var mysql = require('mysql') //collounm users74629
var connectionFile = require('./connection')
var express = require('express')
var app = express()

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set(express.static('public'))

app.get('/', function(req, res){
    res.render('index.ejs')
})

app.get('/register', function(req,res){
    res.render('register.ejs')
})

app.post('/authregister', function(req, res){
    var namereg = request.body.usernamereg;
    var emailreg = request.body.emailreg;
	var passwordreg = request.body.passwordreg;
    if(namereg && emailreg && passwordreg){
        connection.query('SELECT * FROM users74629 WHERE username = ?', [usernamereg], function(error, results, fields){
            if (results.length > 0) {
                response.send('Account already exists with that username!');
                response.end();
            } else if (!/\S+@\S+\.\S+/.test(emailreg)) {
                // Make sure email is valid
                response.send('Invalid email address!');
                response.end();
            } else if (!/[A-Za-z0-9]+/.test(namereg)) {
                // Username validation, must be numbers and characters
                response.send('Username must contain only characters and numbers!');
                response.end();
			}
        })
    }
    connection.query('INSERT INTO accounts (name, email, password) VALUES (?, ?, ?);', [namereg, emailreg, passwordreg], function(error, results, fields) {
		if (error){
			return console.log(error)
		}
		response.redirect('/login')
		response.end()
	})
})

console.log('Servidor ligado porta 3600')

app.listen(3600)