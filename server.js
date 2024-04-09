const express = require('express'); 
const app = express()
const cors = require('cors')
const body_parser = require('body-parser')
const path = require('path')

const cookie = require('cookie-parser')
app.use(cookie())

require('dotenv').config()

app.use(cors())
app.use(body_parser.urlencoded({extended: true}))
app.use(express.json())

const router = require('./routes/routers')
app.use('/api' ,router)

app.use(express.static(path.join(__dirname)+'/public' ))

const getConnection = require('./config/dbConfig');
getConnection(process.env.DB_URL)

const PORT = process.env.SERVER_PORT && 8080
app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
});





