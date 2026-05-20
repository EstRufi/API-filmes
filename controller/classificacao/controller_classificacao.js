const configMenssages = require('../modulo/configMenssages')

const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

const inserirClassificacao = async function(classificacao, contentType){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(classificacao)

            if(validar){
                let result = classificacaoDAO.insertClassificacao(await tratarDados(classificacao))

                if(result){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classificacao

                    return customMessage.DEFAULT_MESSAGE
                }
                else
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
            else
                return validar
        }
        else
            return customMessage.ERROR_CONTENT_TYPE
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(classificacao){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))    

    if(classificacao.classificacao_filme == undefined || classificacao.classificacao_filme == null || classificacao.classificacao_filme > 15 || classificacao.classificacao_filme == ''){
        customMessage.ERROR_BAB_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAB_REQUEST
    }
    else
        return true
}

const tratarDados = async function(classificacao){
    classificacao.classificacao_filme = classificacao.classificacao_filme.replaceAll("'","")
}

module.exports = {
    inserirClassificacao
}