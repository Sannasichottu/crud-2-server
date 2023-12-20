const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserRouter = require('./routes/userRoutes')
require('dotenv').config()
const app = express()

//bodyparse
app.use(express.json())

const uri = process.env.MONGO_URI
mongoose.connect(uri, err => {
    if(err) throw err
})


app.use('/users', UserRouter)

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongoose database connected")
})

app.listen(process.env.PORT,()=>{
    console.log("server running on the port",process.env.PORT)
})