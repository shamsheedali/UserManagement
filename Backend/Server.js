require('dotenv').config()
const express = require('express');
const connectDB = require('./db/Connection');
const userRoute = require("./Router/UserRouter")

const app = express();

app.use(express.json());

//user--route
app.use('/api/user', userRoute);

//Database
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server Started...")
})