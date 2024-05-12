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

function useValidator(req, res, next) {
  console.log("Use validation middleware");
  next();
}

function kidneyValidator(req, res, next) {
  console.log("Your kidney is fine!");
  next();
}

const schema2 = zod.number();
const middlewares = [useValidator, kidneyValidator];

app.post("/health-checkup", ...middlewares, function (req, res) {
  const kidneys = req.body.kidneys;
  const response = schema2.safeParse(kidneys);
  // console.log(response.error);
  if (!response.success) {
    res.status(411).send({
      msg: "Invalid input",
    });
    return;
  } else {
    res.send({ response });
    return;
  }
  // console.log("End of post!"); // This will be called if no return in the above code
});

function validateInput(obj) {
  const response = schema.safeParse(obj);
  return response;
  // console.log(response);
}

validateInput({
  email: "abcd@gmail.com",
  password: "adsffadaf",
});

app.post("/login", function (req, res) {
  const response = validateInput(req.body);
  if (!response.success) {
    res.json({
      msg: "Your input is invalid",
    });
    return;
  }
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
