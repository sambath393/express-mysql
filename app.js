const express = require('express');
const app = express();

const db = require('./routes/dbRoute');
const role = require('./routes/roleRoute');
const users = require('./routes/usersRoute');
const products = require('./routes/productsRoute');
const companies = require('./routes/companiesRoute');
const qoutes = require('./routes/qoutesRoute');
const invoices = require('./routes/invoicesRoute');
const logs = require('./routes/logsRoute');

const dotenv = require('dotenv');
dotenv.config();

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/db', db);
app.use('/role', role);
app.use('/users', users);
app.use('/products', products);
app.use('/companies', companies);
app.use('/qoutes', qoutes);
app.use('/invoices', invoices);
app.use('/logs', logs);

const server = app.listen(process.env.PORT, function () {
  const host = server.address().address !== '::' ? server.address() : 'localhost';
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
