const { render } = require('ejs')
const express = require('express')

const router = express.Router()


const fs = require('fs')


router.get('/', (req, res) => {


    const context = {}
    context.myDinos = require('../prehistoric_creatures.json')


    res.render('prehistoric_creatures/index' , context)
})


// Process form
router.post('/', (req, res) => {
    console.log('This is the request body', req.body)

    // retrieve the save pre creatures as object
    const dinoData = require('../prehistoric_creatures.json')

    // push the new creature from the form
    dinoData.push(req.body);

    // save dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(dinoData));


    res.redirect('/prehistoric_creatures')
})



// Load form
router.get('/new', (req, res) => {

    res.render('prehistoric_creatures/new')
})




router.get('/:idx', (req, res) => {

    const context = {}

    const dinoData = require('../prehistoric_creatures.json')

    let dinoIndex = parseInt(req.params.idx)

    // context
    context.myDino = dinoData[dinoIndex]

    res.render('prehistoric_creatures/show', context)

})


module.exports = router