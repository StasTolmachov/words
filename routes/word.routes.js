const Router = require('express')
const router = new Router()
const wordController = require('../controller/word.controller')

router.get('/allWords', wordController.allWords)

router.get('/getAllWords', wordController.getAllWords)
router.get('/search', wordController.getSearch)
router.post('/updateWord', wordController.updateWord)






// router.get('/words', wordController.words)

module.exports = router