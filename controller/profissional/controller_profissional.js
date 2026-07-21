const configMenssages = require('../modulo/configMenssages.js')

const profissionalDAO = require('../../model/DAO/profissional/profissional.js')

//  Quando tiver as tabelas intermediarias prontas colocar aqui
const controllerSexo = require('../sexo/controller_sexo.js')

const inserirProfissional = async function(profissional, contentType){

   let customMessage = JSON.parse(JSON.stringify(configMenssages))

   try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDados(profissional)
            
            if(validar){
                let result = await profissionalDAO.insertProfissional(await tratarDados(profissional))
                
                if(result){
        
                    profissional.id = result

                    // mecher aqui SOMENTE QUANDO TIVER AS TABELAS INTERMEDIARIAS
                    // for(itemGenero of filme.genero){
                    //     let FilmeGenero = {
                    //         "id_filme": filme.id,
                    //         "id_genero": itemGenero.id
                    //     }

                    //     let resultFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(FilmeGenero)

                    //     //validação para ferificar se todos os itens de relacionamento foram inseridos
                    //     if(!resultFilmeGenero.status){
                    //         return customMessage.SUCCES_CREATED_ITEM_WARNING
                    //     }
                        
                    // }

                    customMessage.DEFAULT_MESSAGE.status =  customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = profissional

                    return customMessage.DEFAULT_MESSAGE 
                }
                else
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
            } 
            else
                return validar 
        }
        else{
            return customMessage.ERROR_CONTENT_TYPE
        }
   }
    catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarProfissional = async function () {

    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
       
        let result = await profissionalDAO.selectAllProfissional()

        if (result) {
            
            if (result.length > 0) {

                for (profissional of result) {
                    
                    let resultSexo = await controllerSexo.buscarSexo(profissional.id_sexo)

                    if (resultSexo.status) {
                       
                        profissional.sexo = resultSexo.response.sexo


                        
                        delete profissional.id_sexo
                    } else {
                        return resultSexo
                    }

                    //Aqui coloca as coisas da intermediaria

                    // let resultGeneros = await controllerFilmeGenero.buscarGeneroIdFilme(filme.id)

                    // if (resultGeneros.status) {
                    //     filme.genero = resultGeneros.response.filme_genero

                    // // Aqui eu estou dizendo que se vier um 404 do gênero, ele não vai quebrar o codigo e vai continuar seguindo,
                    // // Assim o codigo vai sair seguir evitando  erros
                    // } else if(resultGeneros.status_code == 404){ 
                    //     filme.genero = []
                    // }else {
                    //     return resultGeneros
                    // }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout =  result.length
                customMessage.DEFAULT_MESSAGE.response.profissional = result

                return customMessage.DEFAULT_MESSAGE 
            } else 
                return customMessage.ERROR_NOT_FOUND 
        } else 
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const buscarProfissional = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {

        if(id == undefined || String(id).replaceAll(' ', '') == ''|| id == null || isNaN(id)){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
  
            let result = await profissionalDAO.selectByIdProfissional(id)

            if(result){

                if(result.length >0){

                    for (profissional of result) {
                        
                        let resultSexo = await controllerSexo.buscarSexo(profissional.id_sexo)

                        if (resultSexo.status) {
                        
                            profissional.sexo = resultSexo.response.sexo


                            
                            delete profissional.id_sexo
                        } else {
                            return resultSexo
                        }

                        //Aqui coloca as coisas da intermediaria

                        // let resultGeneros = await controllerFilmeGenero.buscarGeneroIdFilme(filme.id)

                        // if (resultGeneros.status) {
                        //     filme.genero = resultGeneros.response.filme_genero

                        // // Aqui eu estou dizendo que se vier um 404 do gênero, ele não vai quebrar o codigo e vai continuar seguindo,
                        // // Assim o codigo vai sair seguir evitando  erros
                        // } else if(resultGeneros.status_code == 404){ 
                        //     filme.genero = []
                        // }else {
                        //     return resultGeneros
                        // }
                    }


                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.profissional = result

                    return customMessage.DEFAULT_MESSAGE
                }
                else
                    return customMessage.ERROR_NOT_FOUND 
            }
            else
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDados = async function(profissional){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(profissional.nome == undefined || profissional.nome == '' || profissional.nome == null || profissional.nome.length > 85){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(profissional.nome_nascimento == undefined || profissional.nome_nascimento.length > 85){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME_NASCIMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(profissional.data_nascimento == undefined || profissional.data_nascimento == '' || profissional.data_nascimento == null || profissional.data_nascimento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE NASCIMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(profissional.biografia == undefined || profissional.biografia == '' || profissional.biografia == null){
        customMessage.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(profissional.data_morte == undefined || profissional.data_morte.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DA MORTE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(profissional.data_inicio_carreira == undefined ||  profissional.data_inicio_carreira == '' || profissional.data_inicio_carreira == null || profissional.data_inicio_carreira.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE INICIO DE CARREIRA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if (profissional.foto == undefined || profissional.foto == '' || profissional.foto == null || profissional.foto.length > 256){
        customMessage.ERROR_BAD_REQUEST.field = '[FOTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if (profissional.id_sexo == undefined || String(profissional.id_sexo).replaceAll(' ', '') == '' || profissional.id_sexo == null || isNaN(profissional.id_sexo) || profissional.id_sexo <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID SEXO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else{
        return false
    }
}

const tratarDados = async function(profissional){

        profissional.nome = profissional.nome.replaceAll("'","")
        profissional.nome_nascimento = profissional.nome_nascimento.replaceAll("'","")
        profissional.data_nascimento = profissional.data_nascimento.replaceAll("'","")
        profissional.biografia = profissional.biografia.replaceAll("'","")
        profissional.data_morte = profissional.data_morte.replaceAll("'","")
        profissional.data_inicio_carreira = profissional.data_inicio_carreira.replaceAll("'","")
        profissional.foto = profissional.foto.replaceAll("'","")
    
    return profissional
}
module.exports = {
    inserirProfissional,
    listarProfissional,
    buscarProfissional
}