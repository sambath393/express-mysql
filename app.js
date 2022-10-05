const api = require('./routes/apiRoute')
const cors = require('cors');

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

var bodyParser = require('body-parser');

const PORT = process.env.PORT || 443

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);

app.listen(PORT, function () {
  const host = 'localhost';
  const port = PORT;
  console.log('App listening at http://%s:%s', host, port);
});
