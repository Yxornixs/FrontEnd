const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

//Setting
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Midleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(require("./routes/index"));
app.use("/api/ods", require("./routes/index"));

//Static
app.use(express.static(path.join(__dirname, "public")));

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

module.exports = app;
