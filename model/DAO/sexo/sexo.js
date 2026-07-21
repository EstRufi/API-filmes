const knex = require('knex')
const knexDataBaseConfig = require('../../database_config/knexConfig.js')

const knexConection = knex(knexDataBaseConfig.development)

const insertSexo = async function(nacionalidade){
    
   try {
        let sql = `insert into tbl_nacionalidade(
            nacionalidade
        )value(
            '${nacionalidade.nacionalidade}'
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

const selectByIdSexo = async function(id){
    try {
        let sql = `select * from tbl_nacionalidade where id=${id}`

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

const selectAllSexo = async function(){
    try {
        let sql = `select * from tbl_nacionalidade order by id desc;`

        let result = await knexConection.raw(sql)
    
        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const updateSexo = async function(nacionalidade){
    try {
        console.log(`sql nacionalidade? ${nacionalidade}`)
        let sql = `update tbl_nacionalidade set
            nacionalidade = '${nacionalidade.nacionalidade}'
            where id = '${nacionalidade.id}';`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteSexo = async function(id){
    try {
        let sql = `delete from tbl_nacionalidade where id = ${id}`

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
    insertSexo,
    selectByIdSexo,
    selectAllSexo,
    updateSexo,
    deleteSexo
}