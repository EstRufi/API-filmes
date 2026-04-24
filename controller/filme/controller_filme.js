/**
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados
 *              para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Estela
 * Versão: 1.0.4.26
 */

// import do arquivo de configurações de mensagens do projeto
const configMenssages = require('../modulo/configMenssages.js')

//Import do arquivo do DAO para manipular os dados no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

// Função para inserir um novo filme
const inserirNovoFilme = async function(filme, contentType){

    // Criar uma cópia dos json do arquivo de configuração de mensagens
   let customMessage = JSON.parse(JSON.stringify(configMenssages))

   try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            // Retorna um JSON de erro caso algum atributo seja inválido
            // senão retorna um false(Não teve erro)

            // Chama a função para validar a entrada dos dados do filme
            let validar = await validarDados(filme)

            if(validar){
                return validar //400
            } 
            else{
                // encaminha os dados do filme para o DAO inserir no BD
                let result = await filmeDAO.insertFilme(filme)

                if(result){//201
                    customMessage.DEFAULT_MESSAGE.status =  customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    return customMessage.DEFAULT_MESSAGE 
                }
                else{ // erro 500 (model)
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                } // fecha result
            } // fecha validar
        }
        else{
            return customMessage.ERROR_CONTENT_TYPE //415
        } // fecha content type
   }
    catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

// Função para atuaçlizar um filme existente
const atualizarFilme = async function(){

}

//Função para retornar todos os fulmes existentes
const listarFilme = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        // Chama a função do DAO para retornar a lista de filmes do BD
        let result = await filmeDAO.selectAllFilme()
        // Validação para verificar se o DAO conseguiu processar o script no BD
        if(result){
            //Validar para verificar se o conteúdo do ARRAy tem dados de
            //retorno ou se está vazio
            if(result.length > 0){
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE
            }
            else{
                return customMessage.ERROR_NOT_FOUND // 404
            }
        }
        else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (Model)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        // validação para garantir que o id seja um número válido
        if(String(id).replaceAll(' ', '') == ''|| id == null || id == undefined || isNaN(id)){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        }
        else{
            // chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)

            // Validação para verificar se o DAO retornou dados ou um false (erro)
            if(result){

                // Validação para verificar se o DAO tem  algum dado no Array
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE //200 
                }
                else{
                    return customMessage.ERROR_NOT_FOUND // 404
                }

            }

            else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
            }

        }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

//Função para excluir um filme
const excluirFilme = async function(){

}

// Função para validar os dados de cadastro de Filme
const validarDados = async function(filme){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined){
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else{
        return false
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}