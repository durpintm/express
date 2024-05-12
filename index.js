require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const zod = require("zod");

const port = process.env.PORT | 3000;

const app = express();
app.use(bodyParser.json());
// app.use(express.json());

// const schema = zod.array(zod.number);

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  // country: zod.literal("IN").or(zod.literal("US")),
  // kidneys: zod.array(zod.number),
});

app.post("/health-checkup", function (req, res) {
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  if (!response.success) {
    res.status(411).json({
      msg: "Invalid input",
    });
  } else {
    res.send({ response });
  }
});

function validateInput(obj) {
  const response = schema.safeParse(obj);
  console.log(response);
}

validateInput({
  email: "abcd@gmail.com",
  password: "adsffadaf",
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
