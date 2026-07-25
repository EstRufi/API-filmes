const express = require('express')
const bodyParser = require('body-parser')

const bodyParserJson = bodyParser.json()
const router = express.Router()


const controllerFilme = require('../controller/filme/controller_filme.js')

//OBS: não há problema a url ser diferente se o verbo for diferente
router.post('/',bodyParserJson, async function (request, response){
    // npm install body-parser  --save para receber o que o front mandar

    // Recebendo o body da requisição
    let dados = request.body

    // Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']
    
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request,response){
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id',async function(request, response){

    // Recebe o id do filme via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJson, async function(request, response) {

    // Recebe o id do registro a ser atualizado.
    let id = request.params.id

    // Recebe os dados do body que serão modificados no banco de dados.
    let dados = request.body

    // Recebe o content-type da requisição para validar se é JSON.
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o filme.
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response){
    let id = request. params.id

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router