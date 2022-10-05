
const express = require('express');
const app = express();

const db = require('./api/dbRoute');
const role = require('./api/roleRoute');
const users = require('./api/usersRoute');
const products = require('./api/productsRoute');
const companies = require('./api/companiesRoute');
const qoutes = require('./api/qoutesRoute');
const invoices = require('./api/invoicesRoute');
const logs = require('./api/logsRoute');

app.get('/', ( req, res ) => {
    res.json({ message: 'Server is running'});
})
app.use('/db', db);
app.use('/role', role);
app.use('/users', users);
app.use('/products', products);
app.use('/companies', companies);
app.use('/qoutes', qoutes);
app.use('/invoices', invoices);
app.use('/logs', logs);

module.exports = app