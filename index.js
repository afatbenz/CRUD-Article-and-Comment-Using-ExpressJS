const express   = require('express')
const app       = express()
const port      = 3100
const mongoose        = require('mongoose')
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser:true }, () => {
  console.log("connected to DB")
})

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});