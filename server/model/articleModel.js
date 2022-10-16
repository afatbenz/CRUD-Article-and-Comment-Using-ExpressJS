const { string } = require('@hapi/joi')
const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    id: Number,
    articletitle: String,
    content: String,
    createdate: String,
    createBy: String
})

const Articles = mongoose.model('article', articleSchema)

module.exports = Articles