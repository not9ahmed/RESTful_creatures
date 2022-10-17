const express = require('express')

const ejsLayouts = require('express-ejs-layouts')
const router = require('./controllers/dinosaurs')

const app = express()

const PORT = 3500

app.set('view engine', 'ejs')
app.use(ejsLayouts)

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