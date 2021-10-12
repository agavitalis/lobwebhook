const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Document = require('./models/document');
const app = express();
const port = 5000;

//we load the db location from the JSON files
const config = require("config");

//static files
app.use(express.static('views'))
app.set('view engine', 'hbs');

//db connection and indexing
mongoose.connect(config.DBHost, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

Document.on("index", (error) => {
	error ? console.log("Document Indexing failed", error): console.log("Document Indexing Successful")
})

//don't show the log when it is test
if (config.util.getEnv("NODE_ENV") !== "test") {
	//use morgan to log at command line
	app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

//require routes
const routes = require("./routes/web.js");
app.use(routes);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
