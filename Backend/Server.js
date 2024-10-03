require('dotenv').config()
const express = require('express');
const connectDB = require('./db/Connection');
const userRoute = require("./Router/UserRouter");
const adminRouter = require("./Router/AdminRouter")

const app = express();

app.use(express.json());

//user--route
app.use('/api/user', userRoute);
//admin-route
app.use('/api/admin', adminRouter);

//Database
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server Started...")
})