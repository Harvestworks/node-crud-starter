const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const app = express();
const router = express.Router();

const config = require('./config');
const model = require('./Models/' + config.modelName + 'Model');
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/database');

restify.serve(router, mongoose.model(config.modelName, model)); 
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use(router);

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

