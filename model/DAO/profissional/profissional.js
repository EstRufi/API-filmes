const knex = require('knex')
const knexDataBaseConfig = require("../../database_config/knexConfig.js")

const knexConection = knex(knexDataBaseConfig.development)

const insertProfissional = async function(profissional){
    try {
        
        let sql = `insert into tbl_profissional (
            nome,
            nome_nascimento,
            data_nascimento,
            biografia,
            data_morte,
            data_inicio_carreira,
            foto,
            id_sexo
        ) values(
            '${profissional.nome}',
            if('${profissional.nome_nascimento}' = '',null,'${profissional.nome_nascimento}'),
            '${profissional.data_nascimento}',
            '${profissional.biografia}',
            if('${profissional.data_morte}' = '', null, '${profissional.data_morte}'),
            '${profissional.data_inicio_carreira}',
            '${profissional.foto}',
            '${profissional.id_sexo}'
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

const selectAllProfissional = async function(){
    try {

        let sql = 'select * from tbl_profissional order by id desc'
       
        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0] 
        else
            return false

    } catch (error) {
        return false
    }
}
const selectByIdProfissional = async function(id){
    try {
        let sql = `select * from tbl_profissional where id=${id}`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }
        else{
            return false
        }

    } catch (error) {
        return false
    }
}

module.exports = {
    insertProfissional,
    selectAllProfissional,
    selectByIdProfissional
}