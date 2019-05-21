const express = require('express');
const bodyParser = require('body-parser');
const qh = require('./queryHandler');
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// TODO:    remove cors for deployment
//          Only used in for testing on one pc
const cors = require('cors');
app.use(cors());
app.get('/query', qh.getQueryResult);
app.listen(port, () => console.log('Server running on ' + port));