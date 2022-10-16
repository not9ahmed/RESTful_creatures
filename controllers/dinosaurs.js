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
