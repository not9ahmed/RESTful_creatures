const { render } = require('ejs')
const express = require('express')

const router = express.Router()


const fs = require('fs')


router.get('/', (req, res) => {


    const context = {}
    context.myCreatures = require('../prehistoric_creatures.json')


    res.render('prehistoric_creatures/index' , context)
})


// Process form
router.post('/', (req, res) => {
    console.log('This is the request body', req.body)

    // retrieve the save pre creatures as object
    const creaturesData = require('../prehistoric_creatures.json')

    // push the new creature from the form
    creaturesData.push(req.body);

    // save dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData));


    res.redirect('/prehistoric_creatures')
})



// Load form
router.get('/new', (req, res) => {

    res.render('prehistoric_creatures/new')
})



router.delete('/:idx', (req, res) => {

    console.log('This is my requet params object', req.params)

    let creaturesData = require('../prehistoric_creatures.json')

    creaturesData.splice(req.params.idx, 1)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))

    res.redirect('/prehistoric_creatures')
    
})



router.get('/edit/:creatureID', (req, res) => {


    let context = {}

    // Grab dino data
    let creaturesData = require('../prehistoric_creatures.json')


    context.creature = creaturesData[req.params.creatureID]

    context.creatureID = req.params.creatureID


    // Display edit page

    res.render('prehistoric_creatures/edit', context)
})



// Update the data
router.put('/:creatureID', (req, res) => {


    let context = {}

    // Grab dino data
    let creaturesData = require('../prehistoric_creatures.json')


    // update the dino
    creaturesData[req.params.creatureID].type = req.body.type

    creaturesData[req.params.creatureID].img_url = req.body.img_url


    // update the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))



    res.redirect('/prehistoric_creatures')
})




router.get('/:creatureID', (req, res) => {

    const context = {}

    const dinoData = require('../prehistoric_creatures.json')

    let creatureIndex = parseInt(req.params.creatureID)

    // context
    context.myCreature = dinoData[creatureIndex]

    res.render('prehistoric_creatures/show', context)

})


module.exports = router