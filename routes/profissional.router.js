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

router.get('/',async function (request, response){
    let result = await controllerProfissional.listarProfissional()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request,response){
    let id = request.params.id
    let result = await controllerProfissional.buscarProfissional(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id',bodyParserJson, async function (request,response){
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerProfissional.atualizarProfissional(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id',async function(request, response){
    let id = request.params.id
    let result = await controllerProfissional.deletarProfissional(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router