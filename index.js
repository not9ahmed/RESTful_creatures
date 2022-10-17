const express = require('express')

const ejsLayouts = require('express-ejs-layouts')
const router = require('./controllers/dinosaurs')
const methodOverride = require('method-override')

const app = express()

const PORT = 3500

app.set('view engine', 'ejs')
app.use(ejsLayouts)


// This to override the html method and 
// to allow us use put and delete request methods
app.use(methodOverride('_method'))


// Writing my own middleware
// This is like stop sign
app.use((req, res, next) => {

    console.log('Our own middleware')

    console.log(`Request for ${req.method} at ${req.path}`)

    // Were done here so go after for the controllers
    // So move on
    next()
})





// Take http form data and parses it
app.use(express.urlencoded({extended: false}))


// attaching url to controllers folder
// or prepend to url
app.use('/dinosaurs', require('./controllers/dinosaurs'))


app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))


// Re-routing index to dinosaurs
app.get('/', (req, res) => {


    const myDinos = []

    // wil redirect to dinosaurs page
    res.redirect('/dinosaurs')
})




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})