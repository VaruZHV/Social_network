const express = require('express')
const app = express ()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require("./src/routes/routes");
const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')
const { createConnectionLowdb } = require('./src/routes/db/lowdb')

app.use(express.static('src/public'))

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(router)
app.use(bodyParser.raw({
    type: 'image/png',
    limit: '10mb'
  }));


async function start(){
    try{
        createConnectionLowdb()
        app.listen(PORT, () =>console.log("server has been started") )

    }catch (e){

    }
}
start()




