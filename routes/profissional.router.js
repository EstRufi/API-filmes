const express = require('express')
const bodyParser = require('body-parser')

const bodyParserJson = bodyParser.json()
const router = express.Router()

const controllerProfissional = require('../controller/profissional/controller_profissional.js')

router.post('/', bodyParserJson,async function(request,response){
    let dados = request.body
    let content_type = request.headers['content-type']
    let result =  await controllerProfissional.inserirProfissional(dados,content_type)
    
    response.status(result.status_code)
    response.json(result)
})


module.exports = router