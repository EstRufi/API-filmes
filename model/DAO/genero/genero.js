/**
 * Objetivo: Arquivo responsavel pelo CRUD de dados do Genero no banco de dados
 *              MySQL
 * Data: 08/05/2026
 * Autor: Estela
 * Versão:1.0.5.26
 */

const knex = require('knex')
const knexDataBaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDataBaseConfig.development)

// começando o insert

const insertGenero = async function(genero){
    try {
        let sql = `insert into tbl_genero(
            nome
        )values(
            '${genero.nome}'
        );`

        let  result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }  
}

const updateGenero = async function(genero){
    try {
        let sql = ` update tbl_genero set
	        nome = ${genero.nome}
            where id = ${genero.id};`
        let result = await knexConection.raw(sql)

        if(result)
            return result[0].insertId // Ver se vai SE não for o erro tá aqui
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdFilme = async function (id) {
    try {
        let sql = ` select * from tbl_genero where id = ${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    selectByIdFilme,
    updateGenero
}