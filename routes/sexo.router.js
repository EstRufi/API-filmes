const express = require('express')
const bodyPasser = require('body-parser')

const bodyParserJson = bodyPasser.json()
const router = express.Router()

const controllerSexo = require('../controller/sexo/controller_sexo.js')