 /**
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados
 *              para realizar o CRUD de gênero
 * Data: 13/05/2026
 * Autor: Estela
 * Versão: 1.0.5.26
 */

 const configMenssages = require('../modulo/configMenssages.js')

const generoDAO = require('../../model/DAO/genero/genero.js')

const inserirGenero = async function(genero, contentType){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(genero)
            
            if(validar){
                let result = await generoDAO.insertGenero(await tratarDados(genero))

                if(result){
                    genero.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = genero

                    return customMessage.DEFAULT_MESSAGE
                }
                else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
            else
                return validar

        }
        else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Voltar para terminar pq vou realizar o buscar
const atualizarGenero = async function(genero,id,contentType){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resulBuscarGenero = await buscarGenero(id)
            
            if(resulBuscarGenero.status){
                if(resulBuscarGenero){
                    let validar = validarDados(genero)

                    if(validar){
                        genero.id = Number(id)

                        let result = await generoDAO.updateGenero(await tratarDados(genero))
                        
                        if(result){
                            customMessage.DEFAULT_MESSAGE.status = configMenssages.SUCCES_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code =customMessage.SUCCES_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = genero

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
        }
        else
            return customMessage.ERROR_CONTENT_TYPE
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const listarGenero = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    try {
            let result = await generoDAO.selectAllGenero()
        
        if(result){
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout = result.length
                customMessage.DEFAULT_MESSAGE.response.genero = result

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

const buscarGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        if(id == undefined || isNaN(id) || id == null || String(id).replaceAll(' ','') == ''){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            let result = await generoDAO.selectByIdGenero(id)

            if(result){
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.genero = result
    
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

const excluirGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
}

const validarDados = async function(genero){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(genero.nome == undefined || genero.nome == null || genero.nome == '' || genero.nome >30){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else
        return true
}

const tratarDados = async function(genero){
    genero.nome = genero.nome.replaceAll("'","")

    return genero
}

module.exports = {
    inserirGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero,
    tratarDados
}