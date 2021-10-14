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

app.get("/api/hacks/all", async function (req, res) {
  try {
    let hackDetails = await db.getCollection("hacks").find();
    res.json(hackDetails);
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.post("/api/hacks", async function (req, res) {
  try {
    let { name, description, tag, createdBy, votedBy, creationDate } = req.body;
    await db
      .getCollection("hacks")
      .insert({ name, description, tag, createdBy, votedBy, creationDate });
    res.status(201).send("Created");
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.put("/api/hacks/:hacksId", async function (req, res) {
  try {
    let hacksId = parseInt(req.params.hacksId);
    let { name, description, tag, createdBy, votedBy, creationDate } = req.body;
    await db
      .getCollection("hacks")
      .findAndUpdate({ $loki: hacksId }, (item) => {
        item.name = name;
        item.description = description;
        item.tag = tag;
        item.createdBy = createdBy;
        item.votedBy = votedBy;
        item.creationDate = creationDate;
      });
    res.send("Updated");
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(port, () => {
  console.log(`Hack-ideas app listening at http://localhost:${port}`);
});
