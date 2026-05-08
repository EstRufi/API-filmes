/**
 * Objetivo: Arquivo responsavel pelo CRUD de dados do Genero no banco de dados
 *              MySQL
 * Data: 08/05/2026
 * Autor: Estela
 * Versão:1.0.5.26
 */

const knex = require('knex')
const knexDataBaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexDataBaseConfig.development)

// começando o insert