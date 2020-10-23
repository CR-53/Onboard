const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const mysql = require("mysql");
const session = require("express-session");
// const MySQLStore = require("express-mysql-session")(session);
// const Router = require("./config/Router");
// const MongoDBStore = require('connect-mongodb-session')(session);
const routes = require("./routes");
// const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
  // change to "client/build"
}

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/onboard',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

  
// Define routes here
app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
    // change to "client/build/index.html"
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
