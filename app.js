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

//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function(){
    console.log("API aguardando novas requisições . . . .")
})