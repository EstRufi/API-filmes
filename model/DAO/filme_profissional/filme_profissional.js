const knex = require('knex')
const knexDataBaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDataBaseConfig.development)

const insertfilmeProfissional = async function(filmeProfissional){
    try {
        let sql = `insert into tbl_filme_profissional(
            id_filme,
            id_profissional,
            papel_autor

        )values(
            ${filmeProfissional.id_filme},
            ${filmeProfissional.id_profissional},
            ${filmeProfissional.papel_autor}
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

const selectByIdfilmeProfissional = async function (id) {
    try {
        let sql = ` select * from tbl_filme_profissional where id = ${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllfilmeProfissional = async function () {
    try {
        let sql = 'select * from tbl_filme_profissional order by id desc;'

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

const updatefilmeProfissional = async function(filmeProfissional){
    try {
        let sql = ` update tbl_filme_profissional set
            id_filme = ${filmeProfissional.id_filme},
            id_profissional = ${filmeProfissional.id_profissional},
            papel_autor = ${filmeProfissional.papel_autor}
            where id = '${filmeProfissional.id}';`
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deletefilmeProfissional = async function (id) {
    try {
        let sql = `delete from tbl_filme_profissional where id=${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true 
        
        else
            return false

    } catch (error) {
        return false
    }
}

const selectFilmeByIdProfissional = async function (idFilme) {
    try {
        let sql = `select tbl_filme.*
                from tbl_profissional
                    inner join tbl_filme_profissional
                        on tbl_profissional.id = tbl_filme_profissional.id_profissional
                    inner join tbl_filme
                        on tbl_filme.id = tbl_filme_profissional.id_filme
                where tbl_filme.id = ${idFilme} ;`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectProfissionalByIdFilme = async function (idProfissional) {
    try {
        let sql = `select tbl_filme.*
                from tbl_profissional
                    inner join tbl_filme_profissional
                        on tbl_profissional.id = tbl_filme_profissional.id_profissional
                    inner join tbl_filme
                        on tbl_filme.id = tbl_filme_profissional.id_filme
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

const deleteProfissionalByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_filme_profissional where id_filme =${idFilme}`

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
    insertfilmeProfissional,
    selectByIdfilmeProfissional,
    selectAllfilmeProfissional,
    updatefilmeProfissional,
    deletefilmeProfissional,
    selectFilmeByIdProfissional,
    selectProfissionalByIdFilme,
    deleteProfissionalByIdFilme
}