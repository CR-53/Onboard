const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./config/Router');

const PORT = process.env.PORT || 3001;
const app = express();

// const apiRoures = require("./routes/apiRoutes");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here


// Connect to MySQL DB
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'onboard_login'
})

db.connect(function(err) {
  if (err) {
    console.log(`DB error`);
      throw err;
      return false;
  }
});

const sessionStore = new MySQLStore({
  // session time to expire (set to 5 years)
  expiration: (1825 * 86400 * 1000),
  endConnectionOnClose: false
}, db);

app.use(session({
  key: 'session-key',
  secret: 'session-secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1825 * 86400 * 1000),
    httpOnly: false
  }
}));

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/onboard",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  );
  
new Router(app, db);
// Send every other request to the React app

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
