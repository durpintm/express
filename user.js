const express = require("express");
const jwt = require("jsonwebtoken");
const jwtKey = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  console.log(username, password);
  // const user = ALL_USERS.filter((user) => {
  //   return user.username === username && user.password === password;
  // });
  const user = ALL_USERS.find(
    (user) => user.username === username && user.password === password
  );

  // console.log(user);
  if (user) return true;
  return false;

  // write logic to return true or false if this user exists
  // in ALL_USERS array
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtKey);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  console.log(token);
  try {
    const decoded = jwt.verify(token, jwtKey);
    const username = decoded.username;
    const users = ALL_USERS.filter((user) => user.username != username);
    return res.json({
      data: users,
    });
    // return a list of users other than this username
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);
