const knex = require('knex')
const knexDataBaseConfig = require('../../database_config/knexConfig.js')
const { deleteGenero } = require('../genero/genero.js')

const knexConection = knex(knexDataBaseConfig.development)

const insertClassificacao = async function(classificacao){
    
   try {
        let sql = `insert into tbl_classificacao(
	        classificacao_filme
        )value(
	        '${classificacao.classificacao_filme}'
        );`

        let result = await knexConection.raw(sql)
        if(result)
            return result[0].insertId
        
        else
            return false

    } catch (error) {
        return false
    }
}
// 'PAREI AQUI'
const selectByIdClassificacao = async function(id){
    try {
        let sql = `select * from tbl_classificacao where id=${id}`

        let result = await knexConection.raw(sql)

        if(result){

            return result[0]
        }
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllClassificacao = async function(){
    try {
        let sql = `select * from tbl_classificacao order by id desc;`

        let result = await knexConection.raw(sql)
    
        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const updateClassificacao = async function(classificacao){
    try {
        let sql = `update tbl_classificacao set
            classificacao_filme = '${classificacao.classificacao_filme}'
            where id = '${classificacao.id}';`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteClassificacao = async function(id){
    try {
        let sql = `delete from tbl_classificacao where id = ${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports ={
    insertClassificacao,
    selectByIdClassificacao,
    selectAllClassificacao,
    updateClassificacao,
    deleteClassificacao
}