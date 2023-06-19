const Router = require('express')
const router = new Router()
const wordController = require('../controller/word.controller')

router.get('/getWords', wordController.getWords)

// router.get('/words', wordController.words)

module.exports = router