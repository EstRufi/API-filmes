const express = require('express')
const bodyPasser = require('body-parser')

const bodyParserJson = bodyPasser.json()
const router = express.Router()

const controllerNacionalidade = require('../controller/nacionalidade/controller_nacionalidade.js')

router.post('/', bodyParserJson,async function(request,response){
    let dados = request.body
    let content_type = request.headers['content-type']
    let result = await controllerNacionalidade.inserirNacionalidade(dados,content_type)

    response.status(result.status_code)
    response.json(result)
})

router.get('/',async function(request,response){
    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id',async function(request,response){
    let id = request.params.id
    let result = await controllerNacionalidade.buscarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id',bodyParserJson, async function(request,response){
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerNacionalidade.atualizarNacionalidade(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})
module.exports = router