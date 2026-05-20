const knex = require('knex')
const knexDataBaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDataBaseConfig.development)

const insertClassificacao = async function(classificacao){
   try {
        let sql = `insert into tbl_classificacao(
	        classificacao_filme
        )value(
	        '${classificacao.classificacao_filme}'
        );`

        let result = knexConection.raw(sql)

        if(result)
            return result[0].insetId
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports ={
    insertClassificacao
}