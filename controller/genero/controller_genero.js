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

//Wala Aqui

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(genero)
            
            if(validar)
                return validar
            else{
                let result = await generoDAO.insertGenero(await tratarDados(genero))

                if(result){
                    genero.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = genero
                }
                else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }
        else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarGenero = async function(filme,id,contentType){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
}

const listarGenero = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
}

const buscarGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
}

const excluirGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
}

const validarDados = async function(genero){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(genero.nome == undefined || genero.nome == null || genero.nome == '' || isNaN(genero.nome) || genero.nome >30){
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