const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const healths = require("./routes/health");
const auth = require("./routes/auth");
const animals = require("./routes/animal");

app.use("/api/v1", healths);
app.use("/api/v1", auth);
app.use("/api/v1", animals);

app.use(errorMiddleware);

module.exports = app;
