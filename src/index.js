const express = require('express');
const morgan = require("morgan");
const cors = require("cors");


//initializations
const app = express();

//middlewares (Execute before Routes)
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

//routes

app.use(require('./routes/index'));

//starting server
app.listen(8000);
console.log('Server running on port 8000');