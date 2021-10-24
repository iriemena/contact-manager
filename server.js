const express = require("express");
const path = require("path");
const cors = require("cors");
// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./model/user");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app = express();
const port = process.env.PORT || 4000;

// This application level middleware prints incoming requests to the servers console
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

console.log(process.env.MONGODB_URI);

app.use(express.json());
app.use(cors());

app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected...");
});

// Get all user
app.get("/contacts", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Post user
app.post("/contacts", (req, res) => {
  const post = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  const newUser = new User(post);
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get single user
app.route("/contacts/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete user
app.route("/contacts/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update contact
app.route("/update/:id").put((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;

      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// This middleware informs the express application to serve our compiled React files
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Catch any bad requests
app.get("*", (req, res) => {
  res.status(200).json({
    msg: "Catch All",
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
