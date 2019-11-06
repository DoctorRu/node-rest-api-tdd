const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// export NODE_ENV = 'production';
console.log(`app: ${app.get("env")}`);

app.set("view engine", "pug"); // set pug as html template render

app.use(express.json()); // parse json
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // url http://localhost:3333/readme.txt
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

console.log("Application name: " + config.get("name"));
console.log("Mail server: " + config.get("mail.host"));
console.log("Mail password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

const port = process.env.EXPRESS_PORT || 3333;
app.listen(port, () => console.log(`Listening on port ${port}...`));
