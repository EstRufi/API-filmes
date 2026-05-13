/**
 * Objetivo: Arquivo responsável pela padronização das mensagens e status code
 *              do projeto de filmes
 * Data: 17/04/2026
 * Autor: Estela
 * Versão: 1.0.4.26
 */

//Boa pratica se coloca em maiúsculo as consts

//Padronização dos retornos da API (cabeçalho)
const DEFAULT_MESSAGE = {
    api_description: 'API para controlar o projeto de Filmes',
    development: 'Estela Rufino Brito',
    version: '1.1.5.26',
    status: Boolean,
    status_code: Number,
    response: {

    }
}

//Mensagens de ERRO do projeto de filme
const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição devido a erros de entrada de dados.'
}

//Mensagens de ERRO em relação a requisição do Banco de Dados (500)
const ERROR_INTERNAL_SERVER_MODEL = {
    status: false, 
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno no servidor [MODEL]'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false, 
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno no servidor [CONTROLLER]'
}

const ERROR_NOT_FOUND = {
    status: false, 
    status_code: 404,
    message: 'Não foram encontrados dados para retorno.'
}

const ERROR_CONTENT_TYPE = {
    status: false, 
    status_code: 415,
    message: 'Não foi possível processar a requisição, pois o formato de dados encaminhado não é suportado pelo servidor, apenas deve ser utilizado JSON.'
}

// Mensagens de SUCESSO do projeto de filmes

const SUCCES_RESPONSE = {
    status: true,
    status_code: 200
}

const SUCCES_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item atualizado com sucesso!'
}

const SUCCES_DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item excluido com sucesso!'
}

const SUCCES_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item inserido com sucesso!'
}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCES_CREATED_ITEM,
    SUCCES_RESPONSE,
    SUCCES_DELETED_ITEM,
    SUCCES_UPDATED_ITEM
    
}