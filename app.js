const express = require('express');
const app = express();
const db = require('./routes/dbRoute');
const role = require('./routes/roleRoute');
const users = require('./routes/usersRoute');
const products = require('./routes/productsRoute');
const companies = require('./routes/companiesRoute');

var bodyParser = require('body-parser')
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/db', db);
app.use('/role', role);
app.use('/users', users);
app.use('/products', products);
app.use('/companies', companies);

var server = app.listen(8081, function () {
  var host = server.address().address !== '::' ? server.address() : 'localhost';
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
