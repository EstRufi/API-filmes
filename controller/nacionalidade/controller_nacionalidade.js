const configMenssages = require('../modulo/configMenssages')

const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')


const inserirNacionalidade = async function(nacionalidade, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            
            let validar = await validarDados(nacionalidade)
            
            if(validar){
                
                let result = await nacionalidadeDAO.insertNacionalidade(await tratarDados(nacionalidade))
                
                if(result){
                    
                    nacionalidade.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = nacionalidade

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

const listarNacionalidade = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let result = await nacionalidadeDAO.selectAllNacionalidade()

        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout =  result.length
                customMessage.DEFAULT_MESSAGE.response.nacionalidade = result

                return customMessage.DEFAULT_MESSAGE
            }
            else
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
        else
            return customMessage.ERROR_NOT_FOUND
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarNacionalidade = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    
    try {
        if(id == undefined || isNaN(id) || id == null || String(id).replaceAll(' ','') == ''){
            configMenssages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            const result = await nacionalidadeDAO.selectByIdNacionalidade(id)
            
            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidade = result

                    return customMessage.DEFAULT_MESSAGE
                }
                else
                    return customMessage.ERROR_NOT_FOUND
            }
            else
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarNacionalidade = async function (nacionalidade,id,contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarNacionalidade = await buscarNacionalidade(id)
            if(resultBuscarNacionalidade.status){
                if(resultBuscarNacionalidade){
                    let validar = await validarDados(nacionalidade)
                    
                    if(validar){
                        nacionalidade.id = Number(id)

                        let result = await nacionalidadeDAO.updateNacionalidade(await tratarDados(nacionalidade))

                        if(result){
                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = nacionalidade

                            return customMessage.DEFAULT_MESSAGE
                        }
                        else
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                    else
                        return validar
                }
                else
                    return customMessage.ERROR_BAD_REQUEST
            }
            else
                return resultBuscarNacionalidade
        }
        else
            return customMessage.ERROR_CONTENT_TYPE
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const deletarNacionalidade = async function (id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let resultbuscarNacionalidade = await buscarNacionalidade(id)
        if(resultbuscarNacionalidade.status){
            let result = await nacionalidadeDAO.deleteNacionalidade(id)

            if(result){
                return customMessage.SUCCES_DELETED_ITEM
            }
            else
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
        else
            return resultBuscarClassificacao
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(nacionalidade){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))    
    
    if(nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.length > 30 || nacionalidade.nacionalidade == ''){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else
        return true
}

const tratarDados = async function(nacionalidade){
    nacionalidade.nacionalidade = nacionalidade.nacionalidade.replaceAll("'","")

    return nacionalidade
}

module.exports = {
    inserirNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    atualizarNacionalidade,
    deletarNacionalidade
}