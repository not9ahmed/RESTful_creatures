const { render } = require('ejs')
const express = require('express')

const router = express.Router()


const fs = require('fs')


router.get('/', (req, res) => {

    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    const context = {}
    context.myDinos = dinoData


    // const myDinos = require('../dinosaurs.json')
    // context.myDinos = require('../dinosaurs.json')
    // console.log(context)
    // res.send('hello world')

    res.render('dinosaurs/index.ejs' , context)
})




router.post('/', (req, res) => {
    console.log('This is the request body', req.body)


    console.log('Name:', req.body.name)
    console.log('Type:', req.body.type)



    // read dinosaurs file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    
    // add item to dinosaurs array
    dinoData.push(req.body)


    // save dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))



    res.redirect('/dinosaurs')
})




router.get('/new', (req, res) => {

    res.render('dinosaurs/new')
})


router.delete('/:idx', (req, res) => {

    console.log('This is my requet params object', req.params)

    let dinoData = require('../dinosaurs.json')

    dinoData.splice(req.params.idx, 1)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
    
})



router.get('/edit/:idx', (req, res) => {


    let context = {}

    // Grab dino data
    let dinoData = require('../dinosaurs.json')


    context.dino = dinoData[req.params.idx]

    context.dinoId = req.params.idx


    // Display edit page

    res.render('dinosaurs/edit', context)
})



// Update the data
router.put('/:dinoID', (req, res) => {


    let context = {}

    // Grab dino data
    let dinoData = require('../dinosaurs.json')


    // update the dino
    dinoData[req.params.dinoID].name = req.body.name

    dinoData[req.params.dinoID].type = req.body.type


    // update the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))



    res.redirect('/dinosaurs')
})


router.get('/:idx', (req, res) => {


    const context = {}

    // get the dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = parseInt(req.params.idx)

    // context
    context.myDino = dinoData[dinoIndex]


    console.log(context)

    console.log('This is the req.params object!', req.params.idx)

    res.render('dinosaurs/show', context)



})



module.exports = router
