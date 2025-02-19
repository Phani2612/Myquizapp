const Express = require('express')

const Router = Express.Router()


const {SignUp , Login} = require('../controllers/UserFlow')


Router.post('/register' , SignUp)
Router.post('/login' , Login)




module.exports = Router