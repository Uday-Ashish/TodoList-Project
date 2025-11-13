const express = require('express');
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require('colors');
const cors = require("cors");
const connectDB = require('./config/db');


dotenv.config(); // env config

// connect DB
connectDB();

const app = express();  //rest object

// space for middleware
app.use(express.json());  // json is faster than xml
app.use(morgan("dev")); // shows url logs in console for dev work
app.use(cors()); // cross origin


// spc for routes
app.use('/api/v1/user', require('./routes/userRoute'));
app.use("/api/v1/todo", require("./routes/todoRoute"));
app.use('/api/v1/test',require('./routes/testRouter')); // routes to the file top to bottom

//ports

PORT = process.env.PORT || 8000;


//listners

app.listen(PORT,() => {
    console.log(`server is running on port: ${PORT}`.bgGreen);
});