const express = require('express');
const app = express();

//middlewares (Execute before Routes)
app.use(express.json());
//process simple data
app.use(express.urlencoded({ extended: false }));
//routes
app.use(require('./routes/index'));

app.listen(8000);
console.log('Server running on port 8000');