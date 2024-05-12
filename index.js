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
  email: zod.string(),
  password: zod.string(),
  country: zod.literal("IN").or(zod.literal("US")),
  kidneys: zod.array(zod.number),
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

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
