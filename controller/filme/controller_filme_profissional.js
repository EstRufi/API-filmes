const configMenssages = require('../modulo/configMenssages.js')

const filmeProfissionalDAO = require('../../model/DAO/filme_profissional/filme_profissional.js')

const inserirFilmeProfissional = async function(filmeProfissional){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
            let validar = await validarDados(filmeProfissional)
            
            if(validar){
                let result = await filmeProfissionalDAO.insertfilmeProfissional(filmeProfissional)

                if(result){
                    filmeProfissional.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeProfissional

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

const atualizarFilmeProfissional = async function(filmeProfissional,id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
 
        let resulBuscarId = await buscarFilmeProfissional(id)
            
        if(resulBuscarId.status){
            if(resulBuscarId){
                let validar = await validarDados(filmeProfissional)

                if(validar){
                    filmeProfissional.id = Number(id)

                    let result = await filmeProfissionalDAO.updatefilmeProfissional(filmeProfissional)
                            
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = configMenssages.SUCCES_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code =customMessage.SUCCES_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filmeProfissional

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

const listarfilmeProfissional = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
            let result = await filmeProfissionalDAO.selectAllfilmeProfissional()
        
        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_profissional = result

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

const buscarFilmeProfissional = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(id == undefined || isNaN(id) || id == null || String(id).replaceAll(' ','') == ''){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await filmeProfissionalDAO.selectByIdfilmeProfissional(id)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_profissional = result
    
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

const excluirFilmeProfissional = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let resulBuscarfilmeProfissional = await buscarFilmeProfissional(id)
        if(resulBuscarfilmeProfissional.status){
            let result = await filmeProfissionalDAO.deletefilmeProfissional(id)
    
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

const validarDados = async function(filmeProfissional){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(filmeProfissional.id_filme == undefined || filmeProfissional.id_filme == null || filmeProfissional.id_filme == '' || filmeProfissional.id_filme <=0 || isNaN(filmeProfissional.id_filme)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filmeProfissional.id_profissional == undefined || filmeProfissional.id_profissional == null || filmeProfissional.id_profissional == '' || filmeProfissional.id_profissional <=0 || isNaN(filmeProfissional.id_profissional)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filmeProfissional.papel_autor == undefined || filmeProfissional.papel_autor == '' || filmeProfissional.papel_autor == null || filmeProfissional.papel_autor.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = '[PAPEL DO AUTOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else
        return true
}

// Funções da tabela intermediaria

const buscarFilmeIdProfissional = async function(idFilme){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idFilme == undefined || isNaN(idFilme) || idFilme == null || isNaN(idFilme)|| idFilme <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            // se der errado é essa linha a baixo
            let result = await filmeProfissionalDAO.selectFilmeByIdProfissional(idFilme)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_profissional = result
    
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

const buscarProfissionalIdFilme = async function(idProfissional){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idProfissional == undefined || isNaN(idProfissional) || idProfissional == null || isNaN(idProfissional)|| idProfissional <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_PROFISSIONAL] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await filmeProfissionalDAO.selectProfissionalByIdFilme(idProfissional)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_profissional = result
    
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

const excluirProfissionalIdNacionalidade = async function(idFilme){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        
        let result = await filmeProfissionalDAO.deleteProfissionalByIdFilme(idFilme)
    
        if(result)
            return customMessage.SUCCES_DELETED_ITEM
        
        else 
           return customMessage.ERROR_INTERNAL_SERVER_MODEL
      
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
