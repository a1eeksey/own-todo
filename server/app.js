const express = require('express')
const mongoose = require('mongoose')
// cors policy
const cors = require('cors')
const appRoutes = require('./routes/appRoutes')
// express init
const app = express()
// json init
app.use(express.json())

// mongodb
const dbURI = "mongodb+srv://youtwigrif:hero20061411@cluster0.5eomgqa.mongodb.net/?retryWrites=true&w=majority"

// escape from cors policy problems 
app.use(cors())

const start = () => {
    try {
        // connect to db
        mongoose.connect(dbURI, { useNewUrlParser: true })
            // listen to port 3000 
            .then((result) => app.listen(3000), console.log('connected to port 3000'))
            // if error
            .catch((err) => console.log(err));
    } catch(e) {
        console.log(e);
    }
}

// use auth functions
app.use(appRoutes)

start()
