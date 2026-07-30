const knex = require('knex')
const knexDataBaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDataBaseConfig.development)

const insertProfissionalCargo = async function(profissionalCargo){
    try {
        let sql = `insert into tbl_profissional_cargo(
            id_profissional,
            id_cargo
        )values(
            ${profissionalCargo.id_profissional},
            ${profissionalCargo.id_cargo}
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

const selectByIdProfissionalCargo = async function (id) {
    try {
        let sql = ` select * from tbl_profissional_cargo where id = ${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllProfissionalCargo = async function () {
    try {
        let sql = 'select * from tbl_profissional_cargo order by id desc;'

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

const updateProfissionalCargo = async function(profissionalCargo){
    try {
        let sql = ` update tbl_profissional_cargo set
            id_profissional = ${profissionalCargo.id_profissional},
            id_cargo = ${profissionalCargo.id_cargo}
            where id = '${profissionalCargo.id}';`
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteProfissionalCargo = async function (id) {
    try {
        let sql = `delete from tbl_profissional_cargo where id=${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true 
        
        else
            return false

    } catch (error) {
        return false
    }
}

const selectCargoByIdProfissional = async function (idProfissional) {
    try {
        let sql = `select tbl_cargo.*
                from tbl_profissional
                    inner join tbl_profissional_cargo
                        on tbl_profissional.id = tbl_profissional_cargo.id_profissional
                    inner join tbl_cargo
                        on tbl_cargo.id = tbl_profissional_cargo.id_cargo
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

const selectProfissionalByIdCargo = async function (idCargo) {
    try {
        let sql = `select tbl_cargo.*
                from tbl_profissional
                    inner join tbl_profissional_cargo
                        on tbl_profissional.id = tbl_profissional_cargo.id_profissional
                    inner join tbl_cargo
                        on tbl_cargo.id = tbl_profissional_cargo.id_cargo
                where tbl_cargo.id = ${idCargo} ;`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteProfissionalByIdCargo = async function (idCargo) {
    try {
        let sql = `delete from tbl_profissional_cargo where id_cargo =${idCargo}`

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
    insertProfissionalCargo,
    selectByIdProfissionalCargo,
    selectAllProfissionalCargo,
    updateProfissionalCargo,
    deleteProfissionalCargo,
    selectProfissionalByIdCargo,
    selectCargoByIdProfissional,
    deleteProfissionalByIdCargo
}