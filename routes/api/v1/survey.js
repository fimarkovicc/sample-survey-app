const express = require('express')
const router = express.Router()

const surveyRes201 = require('./../../../mocks/surveyRes201.json')
const surveyRes500 = require('./../../../mocks/surveyRes500.json')



router.get("/", (req, res) => {
    const data = require('../../../mocks/survey.json')
    res.status(200).send(data)
})

router.post("/:id/answers", (req, res) => {
    const id = req.params.id
    
    if(id == '2660dd24-e2db-42c1-8093-284b1df2664c') {
        surveyRes201.data.attributes.answers.push(...req.body.data.attributes.answers)
        res.status(201).send(surveyRes201)
    }else{
        res.status(500).send(surveyRes500)
    }
})

module.exports = router