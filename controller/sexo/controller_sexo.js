const configMenssages = require('../modulo/configMenssages')

const sexoDAO = require('../../model/DAO/sexo/sexo.js')

const inserirSexo = async function(sexo, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            
            let validar = await validarDados(sexo)
            
            if(validar){
    
                let result = await sexoDAO.insertSexo(await tratarDados(sexo))
                
                if(result){
                    sexo.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = sexo

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

const listarSexo = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let result = await sexoDAO.selectAllSexo()

        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout =  result.length
                customMessage.DEFAULT_MESSAGE.response.sexo = result

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

const buscarSexo = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    
    try {
        if(id == undefined || isNaN(id) || id == null || String(id).replaceAll(' ','') == ''){
            configMenssages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            const result = await sexoDAO.selectByIdSexo(id)
            
            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.sexo = result

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

const atualizarSexo = async function (sexo,id,contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarSexo = await buscarSexo(id)
            if(resultBuscarSexo.status){
                if(resultBuscarSexo){
                    let validar = await validarDados(sexo)
                    
                    if(validar){
                        sexo.id = Number(id)

                        let result = await sexoDAO.updateSexo(await tratarDados(sexo))
                        
                        if(result){
                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = sexo

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
                return resultBuscarSexo
        }
        else
            return customMessage.ERROR_CONTENT_TYPE
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const deletarSexo = async function (id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let resultBuscarSexo = await buscarSexo(id)
        if(resultBuscarSexo.status){
            let result = await sexoDAO.deleteSexo(id)

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

const validarDados = async function(sexo){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))    
    
    if(sexo.sexo == undefined || sexo.sexo == null || sexo.sexo.length > 20 || sexo.sexo == ''){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else
        return true
}

const tratarDados = async function(sexo){
    sexo.sexo = sexo.sexo.replaceAll("'","")

    return sexo
}

module.exports = {
    inserirSexo,
    listarSexo,
    buscarSexo,
    atualizarSexo,
    deletarSexo
}