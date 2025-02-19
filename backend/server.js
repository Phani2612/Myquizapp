const Express = require('express')

const App = Express()

const CORS = require('cors')



App.use(Express.urlencoded())
App.use(Express.json())
App.use(CORS())



require('dotenv').config()


const DB = require('./config/db')
DB()

const UserRoutes = require('./routes/Userroutes')

App.use('/' , UserRoutes)


App.listen(5000 , ()=>{

     console.log("Port is running at 5000")
})