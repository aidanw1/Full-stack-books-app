//npm init -y
//npm i express ejs express-ejs-layouts
//npm i--save nodemon
//npm i mongoose - integrte with mongodb easier
//using all routes in server.js can get messy
//using mvc, controller file for routes
//databases models will live in models
//npm i --save-dev dotenv - env file to setup up environment variables for mongodb
//check if were running in the production environment
//we dont want to run this env variable unless were in our dev environment
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const mongoose = require('mongoose')
//sets up connection to database
//when developing you want mongo to connect to local db
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('error', () => console.error('connected to mongoose'))
//sets the view engine
app.set('view engine', 'ejs')
//sets where views are coming from
app.set('views', __dirname + '/views')
//express lsyouts
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
//where public files live
app.use(express.static('public'))


app.use('/', indexRouter)
//tell app where listening on certain port
//pulls from environment variable when we deploy
//the server tells us what port were listening too, not us.
//for deveoping where specifing port 3000
app.listen(process.env.PORT || 3000)