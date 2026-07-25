const configMenssages = require('../modulo/configMenssages')

const cargoDAO = require('../../model/DAO/cargo/cargo.js')


const inserirCargo = async function(cargo, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            
            let validar = await validarDados(cargo)
            
            if(validar){
                
                let result = await cargoDAO.insertCargo(await tratarDados(cargo))
                
                if(result){
                    
                    cargo.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = cargo

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

const listarCargo = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let result = await cargoDAO.selectAllCargo()

        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout =  result.length
                customMessage.DEFAULT_MESSAGE.response.cargo = result

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

const buscarCargo = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    
    try {
        if(id == undefined || isNaN(id) || id == null || String(id).replaceAll(' ','') == ''){
            configMenssages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            const result = await cargoDAO.selectByIdCargo(id)
            
            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.cargo = result

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

const atualizarCargo = async function (cargo,id,contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarCargo = await buscarCargo(id)
            if(resultBuscarCargo.status){
                if(resultBuscarCargo){
                    let validar = await validarDados(cargo)
                    
                    if(validar){
                        cargo.id = Number(id)

                        let result = await cargoDAO.updateCargo(await tratarDados(cargo))

                        if(result){
                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = cargo

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
                return resultBuscarCargo
        }
        else
            return customMessage.ERROR_CONTENT_TYPE
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const deletarcargo = async function (id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let resultBuscarCargo = await buscarCargo(id)
        if(resultBuscarCargo.status){
            let result = await cargoDAO.deleteCargo(id)

            if(result){
                return customMessage.SUCCES_DELETED_ITEM
            }
            else
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
        else
            return resultBuscarCargo
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(cargo){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))    
    
    if(cargo.atividade == undefined || cargo.atividade == null || cargo.atividade.length > 30 || cargo.atividade == ''){
        customMessage.ERROR_BAD_REQUEST.field = '[ATIVIDADE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else
        return true
}

const tratarDados = async function(cargo){
    cargo.atividade = cargo.atividade.replaceAll("'","")

    return cargo
}

module.exports = {
    inserirCargo,
    listarCargo,
    buscarCargo,
    atualizarCargo,
    deletarcargo
}