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

module.exports = router