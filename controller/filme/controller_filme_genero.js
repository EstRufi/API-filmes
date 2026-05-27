 /**
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados
 *              para realizar o CRUD de Filme Generp
 * Data: 22/05/2026
 * Autor: Estela
 * Versão: 1.0.5.26
 */

 const configMenssages = require('../modulo/configMenssages.js')

const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')

const inserirFilmeGenero = async function(filmeGenero){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
            let validar = await validarDados(filmeGenero)
            
            if(validar){
                let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

                if(result){
                    filmeGenero.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeGenero

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


const atualizarFilmeGenero = async function(filmeGenero,id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {

        
            let resulBuscarId = await buscarFilmeGenero(id)
            
            if(resulBuscarId.status){
                if(resulBuscarId){
                    let validar = validarDados(filmeGenero)

                if(validar){
                    filmeGenero.id = Number(id)

                    let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)
                        
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = configMenssages.SUCCES_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code =customMessage.SUCCES_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filmeGenero

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
        else{
            return resulBuscarGenero
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const listarFilmeGenero = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
            let result = await filmeGeneroDAO.selectAllFilmeGenero()
        
        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_Genero = result

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

const buscarFilmeGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(id == undefined || isNaN(id) || id == null || String(id).replaceAll(' ','') == ''){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_Genero = result
    
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

const excluirFilmeGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        let resulBuscarFilmeGenero = await buscarFilmeGenero(id)
        if(resulBuscarFilmeGenero.status){
            let result = await filmeGeneroDAO.deleteFilmeGenero(id)
    
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

const validarDados = async function(filmeGenero){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || filmeGenero.id_filme == '' || filmeGenero.id_filme <=0 || isNaN(filmeGenero.id_filme)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filmeGenero.id_genero == undefined || filmeGenero.id_genero == null || filmeGenero.id_genero == '' || filmeGenero.id_genero <=0 || isNaN(filmeGenero.id_genero)){
        customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else
        return true
}

// Funções da tabela intermediaria

const buscarGeneroIdFilme = async function(idFilme){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idFilme == undefined || isNaN(idFilme) || idFilme == null || isNaN(idFilme)|| idFilme <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            // se der errado é essa linha a baixo
            let result = await filmeGeneroDAO.selectGeneroByIdFilme(idFilme)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result
    
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

const buscarFilmeIdGenero = async function(idGenero){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(idGenero == undefined || isNaN(idGenero) || idGenero == null || isNaN(idGenero)|| idGenero <=0){
            customMessage.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result
    
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

module.exports = {
    inserirFilmeGenero,
    atualizarFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    buscarGeneroIdFilme,
    buscarFilmeIdGenero,
    excluirFilmeGenero
}