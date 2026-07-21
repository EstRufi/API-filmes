const express = require('express')
const bodyPasser = require('body-parser')

const bodyParserJson = bodyPasser.json()
const router = express.Router()

const controllerSexo = require('../controller/sexo/controller_sexo.js')

router.post('/', bodyParserJson,async function(request,response){
    let dados = request.body
    let content_type = request.headers['content-type']
    let result = await controllerSexo.inserirSexo(dados,content_type)

    response.status(result.status_code)
    response.json(result)
})

router.get('/',async function(request,response){
    let result = await controllerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id',async function(request,response){
    let id = request.params.id
    let result = await controllerSexo.buscarSexo(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id',bodyParserJson, async function(request,response){
    let id = request.params.id
    let dados = request.body
    
    let contentType = request.headers['content-type']
    let result = await controllerSexo.atualizarSexo(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id',async function (request,response) {
    let id = request.params.id
    let result = await controllerSexo.deletarSexo(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router