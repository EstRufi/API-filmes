const knex = require('knex')
const knexDataBaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDataBaseConfig.development)

const insertProfissionalNacionalidade = async function(profissionalNacionalidade){
    try {
        let sql = `insert into tbl_profissional_nacionalidade(
            id_profissional,
            id_nacionalidade
        )values(
            ${profissionalNacionalidade.id_profissional},
            ${profissionalNacionalidade.id_nacionalidade}
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

const selectByIdProfissionalNacionalidade = async function (id) {
    try {
        let sql = ` select * from tbl_profissional_nacionalidade where id = ${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllProfissionalNacionalidade = async function () {
    try {
        let sql = 'select * from tbl_profissional_nacionalidade order by id desc;'

        let result = await knexConection.raw(sql)
    
        if(Array.isArray(result)){
            return result[0]
        }
        else
            return false
    } catch (error) {
        return false
    }
}

const updateProfissionalNacionalidade = async function(profissionalNacionalidade){
    try {
        let sql = ` update tbl_profissional_nacionalidade set
            id_profissional = ${profissionalNacionalidade.id_profissional},
            id_nacionalidade = ${profissionalNacionalidade.id_nacionalidade}
            where id = '${profissionalNacionalidade.id}';`
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteProfissionalNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_profissional_nacionalidade where id=${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true 
        
        else
            return false

    } catch (error) {
        return false
    }
}

const selectProfissionalByIdNacionalidade = async function (idNacionalidade) {
    try {
        let sql = `select tbl_nacionalidade.*
                from tbl_profissional
                    inner join tbl_profissional_nacionalidade
                        on tbl_profissional.id = tbl_profissional_nacionalidade.id_profissional
                    inner join tbl_nacionalidade
                        on tbl_nacionalidade.id = tbl_profissional_nacionalidade.id_nacionalidade
                where tbl_nacionalidade.id = ${idNacionalidade} ;`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectNacionalidadeByIdProfissional = async function (idProfissional) {
    try {
        let sql = `select tbl_nacionalidade.*
                from tbl_profissional
                    inner join tbl_profissional_nacionalidade
                        on tbl_profissional.id = tbl_profissional_nacionalidade.id_profissional
                    inner join tbl_nacionalidade
                        on tbl_nacionalidade.id = tbl_profissional_nacionalidade.id_nacionalidade
                where tbl_profissional.id = ${idProfissional} ;`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteNacionalidadeByIdProfissional = async function (idProfissional) {
    try {
        let sql = `delete from tbl_profissional_nacionalidade where id_profissional=${idProfissional}`

        let result = await knexConection.raw(sql)

        if(result)
            return true 
        
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertProfissionalNacionalidade,
    selectByIdProfissionalNacionalidade,
    selectAllProfissionalNacionalidade,
    updateProfissionalNacionalidade,
    deleteProfissionalNacionalidade,
    deleteNacionalidadeByIdProfissional,
    selectProfissionalByIdNacionalidade,
    selectNacionalidadeByIdProfissional
}