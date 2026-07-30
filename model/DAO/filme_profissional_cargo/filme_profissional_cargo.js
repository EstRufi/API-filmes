const knex = require('knex')
const knexDataBaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDataBaseConfig.development)

const insertFilmeProfissionalCargo = async function(filmeProfissionalCargo){
    try {
        let sql = `insert into tbl_filme_profissionalcargo(
            id_filme,
            id_profissional_cargo
        )values(
            ${filmeProfissionalCargo.id_filme},
            ${filmeProfissionalCargo.id_profissional_cargo}
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

const selectByIdFilmeProfissionalCargo = async function (id) {
    try {
        let sql = ` select * from tbl_filme_profissionalcargo where id = ${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllFilmeProfissionalCargo = async function () {
    try {
        let sql = 'select * from tbl_filme_profissionalcargo order by id desc;'

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

const updateFilmeProfissionalCargo = async function(filmeProfissionalCargo){
    try {
        let sql = ` update tbl_filme_profissionalcargo set
            id_filme = ${filmeProfissionalCargo.id_filme},
            id_profissional_cargo = ${filmeProfissionalCargo.id_profissional_cargo},
            where id = '${filmeProfissionalCargo.id}';`
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteFilmeProfissionalCargo = async function (id) {
    try {
        let sql = `delete from tbl_filme_profissionalcargo where id=${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true 
        
        else
            return false

    } catch (error) {
        return false
    }
}

const selectFilmeByIdProfissionalCargo = async function (idFilme) {
    try {
        let sql = `select tbl_cargo.id, tbl_cargo.atividade,tbl_profissional.id,tbl_profissional.nome
            from tbl_filme
                inner join tbl_filme_profissionalcargo
                    on tbl_filme.id = tbl_filme_profissionalcargo.id_filme
                inner join tbl_profissional_cargo
                    on tbl_profissional_cargo.id = tbl_filme_profissionalcargo.id_profissional_cargo
                inner join tbl_cargo
                    on tbl_cargo.id = tbl_profissional_cargo.id_cargo
                inner join tbl_profissional
                    on tbl_profissional.id = tbl_profissional_cargo.id_profissional
            where tbl_filme.id = ${idFilme} ; ;`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectProfissionalCargoByIdFilme = async function (idProfissionalCargo) {
    try {
        let sql = `select tbl_cargo.id,tbl_cargo.atividade,tbl_profissional.id,tbl_profissional.nome
            from tbl_profissional_cargo
                inner join tbl_cargo
                    on tbl_cargo.id = tbl_profissional_cargo.id_cargo
                inner join tbl_profissional
                    on tbl_profissional.id = tbl_profissional_cargo.id_profissional
            where tbl_profissional_cargo.id = ${idProfissionalCargo} ;`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteFilmeByIdProfissionalCargo = async function (idProfissionalCargo) {
    try {
        let sql = `delete from tbl_filme_profissionalcargo where id_cargo =${idProfissionalCargo}`

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
    insertFilmeProfissionalCargo,
    selectAllFilmeProfissionalCargo,
    selectByIdFilmeProfissionalCargo,
    updateFilmeProfissionalCargo,
    deleteFilmeProfissionalCargo,
    selectFilmeByIdProfissionalCargo,
    selectProfissionalCargoByIdFilme,
    deleteFilmeByIdProfissionalCargo
}