//  NÃO FUNCIONOU


//Import das dependencias para criar a API
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const controllerFilme = require('./controller/filme/controller_filme.js')
// Import das controllers do projeto

//Permitindo a utilização do JSON no body das requisições
const bodyParserJson = bodyParser.json()

//Criando um objeto do express para criar a API
const app = express()

// Configurações do cors da API
const corsOption = {
    origin: ["*"],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: ["Content-type", "Authorization"],
}

app.use(cors(corsOption))

//ENDPOINTS
//OBS: não há problema a url ser diferente se o verbo for diferente
app.post('/v1/senai/locadora/filme',bodyParserJson, async function (request, response){
    // npm install body-parser  --save para receber o que o front mandar

    // Recebendo o body da requisição
    let dados = request.body

    // Recebendo o tipo de dados da requisição para validar se é JSON
    let contentType = request.headers['content-type']

    
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme', async function(request,response){
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id',async function(request, response){

    // Recebe o id do filme via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJson, async function(request, response) {

    // Recebe o id do registro a ser atualizado.
    let id = request.params.id

    // Recebe os dados do body que serão modificados no banco de dados.
    let dados = request.body

    // Recebe o content-type da requisição para validar se é JSON.
    let contentType = request.headers['content-type']
    console.log(request.headers)
    // Chama a função para atualizar o filme.
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function(request, response){
    let id = request. params.id

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})
//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function(){
    console.log("API aguardando novas requisições . . . .")
})