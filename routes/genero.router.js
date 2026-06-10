// import do express
const express = require('express')
const bodyParser = require('body-parser')


//Permitindo a utilização do JSON no body das requisições
const bodyParserJson = bodyParser.json()

// Criando um objeto de rota para os EndPoints de Genero
const router = express.Router()

// Import da controller do genero
const controllerGenero = require('../controller/genero/controller_genero.js')

// por usar agora o router,devemos trocar o app pelo router
router.post('/', bodyParserJson,async function(request,response){
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirGenero(dados,contentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response){
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response){
    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id',bodyParserJson, async function(request,response){
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerGenero.atualizarGenero(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})
// Export do objeto de rotas do genero
module.exports = router