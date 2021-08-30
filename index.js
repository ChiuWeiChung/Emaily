const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/key");
const authRoutes = require("./routes/authRoutes");
require("./models/User"); //should load first
require("./services/passport"); // should load second

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days expiration
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ==========Route Setting=========
authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
