require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT | 3000;

const app = express();
app.use(bodyParser.json());

app.post("/", function (req, res) {
  const message = req.query.message;
  // console.log(req.body);

  console.log(message);
  res.send("Hello World");
});

app.get("/hello", function (req, res) {
  res.json({
    name: "Durpin",
    age: 21,
  });
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
