/**
 * Objetivo: Arquivo responsavel pelo CRUD de dados do Filme no banco de dados
 *              MySQL
 * Data: 15/04/2026
 * Autor: Estela
 * Versão:1.0.4.26
 */

// async é para que o await(PARE) espere a resposta o banco para depois ir. Eles são um casal tem que ser os dois juntos não pode ser somente um

// Import da biblioteca para manupular dados no Banco de dados MySQL
const knex = require('knex')

// Import do arquivo de configuração para acesso ao banco de dados
const knexDataBaseConfig = require("../../database_config/knexConfig.js")

//Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDataBaseConfig.development)



// Função para inserir um novo filme no banco de dados
const insertFilme = async function(filme){
    try {

        let sql = `insert into tbl_filme (
            nome,
            sinopse,
            capa,
            data_lancamento,
            duracao,
            valor,
            avaliacao
        ) values(
            '${filme.nome}',
        
            '${filme.sinopse}',
        
            '${filme.capa}',
        
            '${filme.data_lancamento}',
        
            '${filme.duracao}',
        
            '${filme.valor}',
        
            if('${filme.avaliacao}' = '',null, '${filme.avaliacao}')
        );`

        // como dar um de BUG
        // dar um console.log na variavel. como é do sql vc pode colocar lá no banco para ver qual é o erro

        // Encaminha para o BD o scriptSQL
        // await faz que o JavaScript PARE e não prosiga, assim dá tempo o banco responder para poder continuar a aplicação
        let result = await knexConection.raw(sql)
        
        if(result)
            return true
        else
            return false
    } 
    catch (error) {
        return false
    }
}

// Função para atualizar um filme existente no banco de dados
const updateFilme = async function(filme){

}

// Função para retornar todos os dados de filme do banco de dados
const selectAllFilme = async function(){

}

// Função para retornar um filme filtrando pelo ID
const selectByIdFilme = async function(id){

}

// Função para excruir um filme filtrando pelo ID
const deleteFilme = async function(id){

}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}