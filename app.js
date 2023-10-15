const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const env = require('dotenv/config');

const app = express();
const port = process.env.PORT || 3000;

// import Routes
const pagesRoute = require("./routes/pagesRoutes");
const authRoute = require("./routes/authRoues");
const {checkUser} = require('./middlewares/authMiddlewares');

// views engine
app.set("view engine", "ejs");
app.set("views");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger("dev"));
app.use(cookieParser());



// connection to database
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(port, () => console.log(`server run on port ${port}`));
  })
  .catch((err) => console.log(err));

// routes
app.use('*', checkUser)
app.use(pagesRoute);
app.use(authRoute);

app.use((req, res, next) => {
  res.status("404").send("404 Not found :)");
});
