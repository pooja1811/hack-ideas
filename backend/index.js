const express = require("express");
const loki = require("lokijs");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
var db = new loki("hack-ideas.db");

//For testing purpose
db.addCollection("hacks");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(port, () => {
  console.log(`Hack-ideas app listening at http://localhost:${port}`);
});
