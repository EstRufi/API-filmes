const configMenssages = require('../modulo/configMenssages.js')

const filmefilmeProfissionalCargoDAO = require('../../model/DAO/filme_profissional_cargo/filme_profissional_cargo.js')

const inserirFilmeProfissionalCargo = async function(filmeProfissionalCargo){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
            let validar = await validarDados(filmeProfissionalCargo)
            
            if(validar){
                let result = await filmefilmeProfissionalCargoDAO.insertFilmeProfissionalCargo(filmeProfissionalCargo)

                if(result){
                    filmeProfissionalCargo.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeProfissionalCargo

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

const atualizarFilmeProfissionalCargo = async function(filmeProfissionalCargo,id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
 
        let resulBuscarId = await buscarfilmeProfissionalCargo(id)
            
        if(resulBuscarId.status){
            if(resulBuscarId){
                let validar = await validarDados(filmeProfissionalCargo)

                if(validar){
                    filmeProfissionalCargo.id = Number(id)

                    let result = await filmefilmeProfissionalCargoDAO.updateFilmeProfissionalCargo(filmeProfissionalCargo)
                            
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = configMenssages.SUCCES_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code =customMessage.SUCCES_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filmeProfissionalCargo

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

const listarFilmeProfissionalCargo = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
            let result = await filmefilmeProfissionalCargoDAO.selectAllFilmeProfissionalCargo()
        
        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_profissional_cargo = result

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

const buscarFilmeProfissionalCargo = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(id == undefined || isNaN(id) || id == null || String(id).replaceAll(' ','') == ''){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await filmefilmeProfissionalCargoDAO.selectByIdFilmeProfissionalCargo(id)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_profissional_cargo = result
    
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

const excluirFilmeProfissionalCargo = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let resulBuscarfilmeProfissionalCargo = await buscarFilmeProfissionalCargo(id)
        if(resulBuscarfilmeProfissionalCargo.status){
            let result = await filmefilmeProfissionalCargoDAO.deleteFilmeProfissionalCargo(id)
    
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

const validarDados = async function(filmeProfissionalCargo){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(filmeProfissionalCargo.idFilme == undefined || filmeProfissionalCargo.idFilme == null || filmeProfissionalCargo.idFilme == '' || filmeProfissionalCargo.idFilme <=0 || isNaN(filmeProfissionalCargo.idFilme)){
        customMessage.ERROR_BAD_REQUEST.field = '[idFilme] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filmeProfissionalCargo.id_profissional_cargo == undefined || filmeProfissionalCargo.id_profissional_cargo == null || filmeProfissionalCargo.id_profissional_cargo == '' || filmeProfissionalCargo.id_profissional_cargo <=0 || isNaN(filmeProfissionalCargo.id_profissional_cargo)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL_CARGO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else
        return true
}

// Funções da tabela intermediaria

const buscarFilmeIdProfissionalCargo = async function(idFilme){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idFilme == undefined || isNaN(idFilme) || idFilme == null || isNaN(idFilme)|| idFilme <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            
            let result = await filmefilmeProfissionalCargoDAO.selectFilmeByIdProfissionalCargo(idFilme)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_profissional_cargo = result
    
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

const buscarProfissionalCargoIdFilme = async function(idProfissionalCargo){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idProfissionalCargo == undefined || isNaN(idProfissionalCargo) || idProfissionalCargo == null || isNaN(idProfissionalCargo)|| idProfissionalCargo <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL_CARGO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await filmefilmeProfissionalCargoDAO.selectFilmeByIdProfissionalCargo(idProfissionalCargo)
            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_profissional_cargo = result
    
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

const excluirProfissionalCargoIdFIlme = async function(idFilme){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        
        let result = await filmefilmeProfissionalCargoDAO.deleteFilmeByIdProfissionalCargo(idFilme)
    
        if(result)
            return customMessage.SUCCES_DELETED_ITEM
        
        else 
           return customMessage.ERROR_INTERNAL_SERVER_MODEL
      
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports ={
    inserirFilmeProfissionalCargo,
    listarFilmeProfissionalCargo,
    buscarFilmeProfissionalCargo,
    atualizarFilmeProfissionalCargo,
    excluirFilmeProfissionalCargo,
    buscarFilmeIdProfissionalCargo,
    buscarProfissionalCargoIdFilme,
    excluirProfissionalCargoIdFIlme
}