//Import das dependencias para criar a API
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')


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

//ENDPOINTS FILME
const filmeRouter = require('./routes/filme.router.js')
app.use('/v1/senai/locadora/filme', cors(), filmeRouter)

// Genero
// Import do aquivo de rotas do GENERO
const generoRouter = require('./routes/genero.router.js')
app.use('/v1/senai/locadora/genero', cors(), generoRouter)

// Classificacao
const classificacaoRouter = require('./routes/classificacao.router.js')
app.use('/v1/senai/locadora/classificacao',cors(), classificacaoRouter)

// Nacionalidade
const nacionalidadeRouter = require('./routes/nacionalidade.router.js')
app.use('/v1/senai/locadora/nacionalidade',cors(),nacionalidadeRouter)

// Sexo
const sexoRouter = require('./routes/sexo.router.js')
app.use('/v1/senai/locadora/sexo',cors(),sexoRouter)

// Profissional
const profissionalRouter = require('./routes/profissional.router.js')
app.use('/v1/senai/locadora/profissional',cors(),profissionalRouter)

//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function(){
    console.log("API aguardando novas requisições . . . .")
})