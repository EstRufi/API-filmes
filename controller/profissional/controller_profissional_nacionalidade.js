const configMenssages = require('../modulo/configMenssages.js')

const profissionalNacionalidadeDAO = require('../../model/DAO/profissional_nacionalidade/profissional_nacionalidade.js')

const inserirProfissionalNacionalidade = async function(profissionalNacionalidade){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
            let validar = await validarDados(profissionalNacionalidade)
            
            if(validar){
                let result = await profissionalNacionalidadeDAO.insertProfissionalNacionalidade(profissionalNacionalidade)

                if(result){
                    profissionalNacionalidade.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = profissionalNacionalidade

                    return customMessage.DEFAULT_MESSAGE
                }
                else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
            else
                return validar

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarProfissionalNacionalidade = async function(profissionalNacionalidade,id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
 
        let resulBuscarId = await buscarprofissionalNacionalidade(id)
            
        if(resulBuscarId.status){
            if(resulBuscarId){
                let validar = await validarDados(profissionalNacionalidade)

                if(validar){
                    profissionalNacionalidade.id = Number(id)

                    let result = await profissionalNacionalidadeDAO.updateProfissionalNacionalidade(profissionalNacionalidade)
                            
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = configMenssages.SUCCES_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code =customMessage.SUCCES_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = profissionalNacionalidade

                        return customMessage.DEFAULT_MESSAGE
                    }
                    else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                }
                else{
                    return validar
                }
            }
            else{
                return customMessage.ERROR_BAD_REQUEST
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const listarprofissionalNacionalidade = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
            let result = await profissionalNacionalidadeDAO.selectAllProfissionalNacionalidade()
        
        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout = result.length
                customMessage.DEFAULT_MESSAGE.response.profissional_nacionalidade = result

                return customMessage.DEFAULT_MESSAGE
            }
            else
                return customMessage.ERROR_NOT_FOUND
        }
        else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarprofissionalNacionalidade = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(id == undefined || isNaN(id) || id == null || String(id).replaceAll(' ','') == ''){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await profissionalNacionalidadeDAO.selectByIdProfissionalNacionalidade(id)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional_nacionalidade = result
    
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

const excluirprofissionalNacionalidade = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let resulBuscarprofissionalNacionalidade = await buscarprofissionalNacionalidade(id)
        if(resulBuscarprofissionalNacionalidade.status){
            let result = await profissionalNacionalidadeDAO.deleteProfissionalNacionalidade(id)
    
            if(result){
                return customMessage.SUCCES_DELETED_ITEM
            }
            else 
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
        else
            return resulBuscarGenero
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(profissionalNacionalidade){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(profissionalNacionalidade.id_profissional == undefined || profissionalNacionalidade.id_profissional == null || profissionalNacionalidade.id_profissional == '' || profissionalNacionalidade.id_profissional <=0 || isNaN(profissionalNacionalidade.id_profissional)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(profissionalNacionalidade.id_nacionalidade == undefined || profissionalNacionalidade.id_nacionalidade == null || profissionalNacionalidade.id_nacionalidade == '' || profissionalNacionalidade.id_nacionalidade <=0 || isNaN(profissionalNacionalidade.id_nacionalidade)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else
        return true
}

// Funções da tabela intermediaria

const buscarProfissionalIdNacionalidade = async function(idProfissional){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idProfissional == undefined || isNaN(idProfissional) || idProfissional == null || isNaN(idProfissional)|| idProfissional <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            // se der errado é essa linha a baixo
            let result = await profissionalNacionalidadeDAO.selectProfissionalByIdNacionalidade(idProfissional)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional_nacionalidade = result
    
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

const buscarNacionalidadeIdProfissional = async function(idNacionalidade){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idNacionalidade == undefined || isNaN(idNacionalidade) || idNacionalidade == null || isNaN(idNacionalidade)|| idNacionalidade <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await profissionalNacionalidadeDAO.selectNacionalidadeByIdProfissional(idNacionalidade)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional_nacionalidade = result
    
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

const excluirProfissionalIdNacionalidade = async function(idProfissional){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        
        let result = await profissionalNacionalidadeDAO.deleteNacionalidadeByIdProfissional(idProfissional)
    
        if(result)
            return customMessage.SUCCES_DELETED_ITEM
        
        else 
           return customMessage.ERROR_INTERNAL_SERVER_MODEL
      
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports ={
    inserirProfissionalNacionalidade,
    listarprofissionalNacionalidade,
    buscarprofissionalNacionalidade,
    atualizarProfissionalNacionalidade,
    excluirprofissionalNacionalidade,
    buscarNacionalidadeIdProfissional,
    buscarProfissionalIdNacionalidade,
    excluirProfissionalIdNacionalidade
}