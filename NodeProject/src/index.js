const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

//initializations
const app = express();

//middlewares (Execute before Routes)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

//routes
app.use(require("./routes/index"));
app.use(require("./routes/auth"));

//starting server
app.listen(process.env.PORT);
console.log("Server running on port", process.env.PORT);
