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
const inserirNovoFilme = async function(filme){

    // Criar uma cópia dos json do arquivo de configuração de mensagens
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
    else if (filme.avaliacao == undefined || filme.avaliacao == isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else{
        // encaminha os dados do filme para o DAO inserir no BD
        let result = await filmeDAO.insertFilme(filme)

        if(result){
            customMessage.DEFAULT_MESSAGE.status =  customMessage.SUCCES_CREATED_ITEM.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
        }
        else{
            customMessage.DEFAULT_MESSAGE.status = customMessage.ERROR_INTERNAL_SERVER_MODEL.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.ERROR_INTERNAL_SERVER_MODEL.status_code
            customMessage.DEFAULT_MESSAGE.message = customMessage.ERROR_INTERNAL_SERVER_MODEL.message
        }
        return customMessage.DEFAULT_MESSAGE   
    }
}

// Função para atuaçlizar um filme existente
const atualizarFilme = async function(){

}

//Função para retornar todos os fulmes existentes
const listarFilme = async function(){

}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function(){

}

//Função para excluir um filme
const excluirFilme = async function(){

}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}