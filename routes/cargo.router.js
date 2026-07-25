const express = require('express')
const bodyPasser = require('body-parser')

const bodyParserJson = bodyPasser.json()
const router = express.Router()

const controllerCargo = require('../controller/cargo/controller_cargo.js')

router.post('/', bodyParserJson,async function(request,response){
    let dados = request.body
    let content_type = request.headers['content-type']
    let result = await controllerCargo.inserirCargo(dados,content_type)

    response.status(result.status_code)
    response.json(result)
})

router.get('/',async function(request,response){
    let result = await controllerCargo.listarCargo()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id',async function(request,response){
    let id = request.params.id
    let result = await controllerCargo.buscarCargo(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id',bodyParserJson, async function(request,response){
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerCargo.atualizarCargo(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id',async function (request,response) {
    let id = request.params.id
    let result = await controllerCargo.deletarcargo(id)

    response.status(result.status_code)
    response.json(result)
})
module.exports = router