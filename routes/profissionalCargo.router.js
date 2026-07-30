const express = require('express')
const bodyParser = require('body-parser')

const bodyParserJson = bodyParser.json()
const router = express.Router()

const controllerProfissionalCargo = require('../controller/profissional/controller_profissional_cargo.js')

router.post('/', bodyParserJson,async function(request,response){
    let dados = request.body
    let content_type = request.headers['content-type']
    let result =  await controllerProfissionalCargo.inserirProfissionalCargo(dados,content_type)
    
    response.status(result.status_code)
    response.json(result)
})

router.get('/',async function (request, response){
    let result = await controllerProfissionalCargo.listarProfissionalCargo()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request,response){
    let id = request.params.id
    let result = await controllerProfissionalCargo.buscarProfissionalCargo(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id',bodyParserJson, async function (request,response){
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerProfissionalCargo.atualizarProfissionalCargo(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id',async function(request, response){
    let id = request.params.id
    let result = await controllerProfissionalCargo.excluirProfissionalCargo(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router