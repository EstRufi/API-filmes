const configMenssages = require('../modulo/configMenssages.js')

const profissionalCargoDAO = require('../../model/DAO/profissional_cargo/profissional_cargo.js')

const inserirProfissionalCargo = async function(profissionalCargo){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
            let validar = await validarDados(profissionalCargo)
            
            if(validar){
                let result = await profissionalCargoDAO.insertProfissionalCargo(profissionalCargo)

                if(result){
                    profissionalCargo.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = profissionalCargo

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

const atualizarProfissionalCargo = async function(profissionalCargo,id,contentType){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resulBuscarId = await buscarProfissionalCargo(id)
                
            if(resulBuscarId.status){
                if(resulBuscarId){
                    let validar = await validarDados(profissionalCargo)
        
                    if(validar){
                        profissionalCargo.id = Number(id)
        
                        let result = await profissionalCargoDAO.updateProfissionalCargo(profissionalCargo)
                        if(result){
                            customMessage.DEFAULT_MESSAGE.status = configMenssages.SUCCES_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code =customMessage.SUCCES_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = profissionalCargo
        
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
            else
                return resulBuscarId
        } 
        else 
            return customMessage.ERROR_CONTENT_TYPE
    } catch (error) {
        
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const listarProfissionalCargo = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
            let result = await profissionalCargoDAO.selectAllProfissionalCargo()
        
        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout = result.length
                customMessage.DEFAULT_MESSAGE.response.profissional_cargo = result

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

const buscarProfissionalCargo = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(id == undefined || isNaN(id) || id == null || String(id).replaceAll(' ','') == ''){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await profissionalCargoDAO.selectByIdProfissionalCargo(id)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional_cargo = result
    
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

const excluirProfissionalCargo = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let resulBuscarprofissionalCargo = await buscarProfissionalCargo(id)
        if(resulBuscarprofissionalCargo.status){
            let result = await profissionalCargoDAO.deleteProfissionalCargo(id)
    
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

const validarDados = async function(profissionalCargo){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(profissionalCargo.id_profissional == undefined || profissionalCargo.id_profissional == null || profissionalCargo.id_profissional == '' || profissionalCargo.id_profissional <=0 || isNaN(profissionalCargo.id_profissional)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(profissionalCargo.id_cargo == undefined || profissionalCargo.id_cargo == null || profissionalCargo.id_cargo == '' || profissionalCargo.id_cargo <=0 || isNaN(profissionalCargo.id_cargo)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_CARGO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else
        return true
}

// Funções da tabela intermediaria

const buscarProfissionalIdCargo = async function(idProfissional){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idProfissional == undefined || isNaN(idProfissional) || idProfissional == null || isNaN(idProfissional)|| idProfissional <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            // se der errado é essa linha a baixo
            let result = await profissionalCargoDAO.selectProfissionalByIdCargo(idProfissional)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional_cargo = result
    
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

const buscarCargoIdProfissional = async function(idCargo){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idCargo == undefined || isNaN(idCargo) || idCargo == null || isNaN(idCargo)|| idCargo <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_CARGO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await profissionalCargoDAO.selectCargoByIdProfissional(idCargo)
            
            if(result){
                
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional_cargo = result
    
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

const excluirProfissionalIdCargo = async function(idProfissional){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        
        let result = await profissionalCargoDAO.deleteProfissionalByIdCargo(idProfissional)
    
        if(result)
            return customMessage.SUCCES_DELETED_ITEM
        
        else 
           return customMessage.ERROR_INTERNAL_SERVER_MODEL
      
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports ={
    inserirProfissionalCargo,
    atualizarProfissionalCargo,
    listarProfissionalCargo,
    buscarProfissionalCargo,
    excluirProfissionalCargo,
    buscarProfissionalIdCargo,
    buscarCargoIdProfissional,
    excluirProfissionalIdCargo
}