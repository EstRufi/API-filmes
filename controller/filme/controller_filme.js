/**
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados
 *              para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Estela
 * Versão: 1.0.4.26
 */

// import do arquivo de configurações de mensagens do projeto
const configMenssages = require('../modulo/configMenssages.js')

//Import do arquivo do DAO para manipular os dados no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

// Função para inserir um novo filme
const inserirNovoFilme = async function(filme, contentType){

    // Criar uma cópia dos json do arquivo de configuração de mensagens
   let customMessage = JSON.parse(JSON.stringify(configMenssages))

   try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            // Retorna um JSON de erro caso algum atributo seja inválido
            // senão retorna um false(Não teve erro)

            // Chama a função para validar a entrada dos dados do filme
            let validar = await validarDados(filme)

            if(validar){
                return validar //400
            } 
            else{

                // encaminha os dados do filme para o DAO inserir no BD
                let result = await filmeDAO.insertFilme(await tratarDados(filme))

                if(result){//201
                    // Cria o ID no JSON do filme e adiciona o id gerado no DAO
                    filme.id = result

                    customMessage.DEFAULT_MESSAGE.status =  customMessage.SUCCES_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filme

                    return customMessage.DEFAULT_MESSAGE 
                }
                else{ // erro 500 (model)
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                } // fecha result
            } // fecha validar
        }
        else{
            return customMessage.ERROR_CONTENT_TYPE //415
        } // fecha content type
   }
    catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

// Função para atuaçlizar um filme existente
const atualizarFilme = async function(filme, id, contentType){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))
    
    try {
        // Validando o content type, para saber se é um JSON que está sendo enviado.
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para buscar o filme e validar se o id está correto
            // Se o ID existe no Banco de Dados e se o filme existe.
            let resultBuscarFilme = await buscarFilme(id)
            
            if (resultBuscarFilme.status) {
                
                // Validando se JSON está chegando corretamente.
                if (resultBuscarFilme) {
                   
                    // Chama a função para validar os dados dos Filmes para ver se estão corretos
                    let validar = await validarDados(filme)
                    
                    if (!validar) {

                        // Adiciona um atributo id no JSON de filme, para enviar para o DAO um único objeto, 
                        // ja que o body iria mandar os dois de formas separados para o DAO.
                        filme.id = Number(id)

                        // Chama a função para atualizar o filme no banco de dados.
                        let result = await filmeDAO.updateFilme(await tratarDados(filme))
                        
                        if (result) {

                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_UPDATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_UPDATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCES_UPDATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = filme

                            return customMessage.DEFAULT_MESSAGE //RETORNA 200

                        } else {
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL // RETORNA 500 (MODEL)
                        }
                    } else { // fecha if sobre a validação
                        return validar // RETORNA 400 DA VALIDAÇÃO DOS CAMPOS DO BANCO DE DADOS!
                    }

                } else { // fecha if sobre o buscarFilme(campos obrigatórios)
                    return customMessage.ERROR_BAD_REQUEST // RETORNA 400
                }


            } else { //fecha if o buscarFilme(id)
                return resultBuscarFilme // RETORNA 400(ID INVÁLIDO) ou 404(NÃO ENCONTRADO) ou 500(MODEL OU CONTROLLER)
            }


        } else { // Fecha if content_type
            return customMessage.ERROR_CONTENT_TYPE // RETORNA 415 
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // RETORNA 500 (CONTROLLER) 
    }
}

//Função para retornar todos os fulmes existentes
const listarFilme = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        // Chama a função do DAO para retornar a lista de filmes do BD
        let result = await filmeDAO.selectAllFilme()
        // Validação para verificar se o DAO conseguiu processar o script no BD
        if(result){
            //Validar para verificar se o conteúdo do ARRAy tem dados de
            //retorno ou se está vazio
            if(result.length > 0){ 
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.cout = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE
            }
            else{
                return customMessage.ERROR_NOT_FOUND // 404
            }
        }
        else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (Model)
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        // validação para garantir que o id seja um número válido
        if(id == undefined || String(id).replaceAll(' ', '') == ''|| id == null || isNaN(id)){
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        }
        else{
            // chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)

            // Validação para verificar se o DAO retornou dados ou um false (erro)
            if(result){

                // Validação para verificar se o DAO tem  algum dado no Array
                if(result.length >0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCES_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCES_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE //200 
                }
                else{
                    return customMessage.ERROR_NOT_FOUND // 404
                }

            }

            else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
            }

        }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

//Função para excluir um filme
const excluirFilme = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    try {
        // chama a função buscar filme para validar se o filme existe
        let resultBuscarFilme = await buscarFilme(id)

        if(resultBuscarFilme.status){
            //Chama a função do DAO para excruir o filme
            let result = await filmeDAO.deleteFilme(id)

            if(result){
                return customMessage.SUCCES_DELETED_ITEM // 200 ou 204 caso queira mudar
            }
            else
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500
        }
        else{
            return resultBuscarFilme // 400 e 404
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para validar os dados de cadastro de Filme
const validarDados = async function(filme){
    let customMessage = JSON.parse(JSON.stringify(configMenssages))

    if(filme.nome == undefined || filme.nome == '' || filme.nome == null || filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.sinopse == undefined || filme.sinopse == '' || filme.sinopse == null){
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.capa == undefined || filme.capa == '' || filme.capa == null || filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.data_lancamento == undefined || filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.duracao == undefined || filme.duracao == '' || filme.duracao == null || filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if(filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    }
    else{
        return false
    }
}

// função para tratar os dados a serem inseridos
const tratarDados = async function(filme){
            // Tratatmento para eliminar a chegada da aspas (') como caracter inválido
        // Isso é para que eu possa proibir que alguem tente quebrar meu banco ou coloca '
        filme.nome = filme.nome.replaceAll("'","")
        filme.sinopse = filme.sinopse.replaceAll("'","")
        filme.capa = filme.capa.replaceAll("'","")
        filme.data_lancamento = filme.data_lancamento.replaceAll("'","")
        filme.duracao = filme.duracao.replaceAll("'","")
        filme.valor = filme.valor.replaceAll("'","")
        filme.avaliacao = filme.avaliacao.replaceAll("'","")
    
    return filme
}
module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
    tratarDados
}