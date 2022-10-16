const express           = require('express');
const router            = express.Router();
const moment            = require('moment')

// const Articles = require('../model/articleModel')
const articles = require('../../dataArticle')
const comments = require('../../dataComment')

const checkSys = ((req, res) => {
    res.send({code:200, message:'success'})
})

const getArticles = ((req, res) => {
    const getArticle = []
    articles.forEach(item => {
        const dataComment = comments.filter(comment => comment.articleID === item.id)
        const comment  = __reconstrucComment(dataComment)
        const articles = { ...item, comment:comment }
        getArticle.push(articles)
    })
    res.send({code:200, message:'success', data:getArticle})
})

const submitArticles = async (req, res)=> {
    try{
        const newArticles = {
            id: articles.length + 1,
            title: req.body.title,
            content: req.body.content,
            createdate: moment().format('YYYY-MM-DD HH:mm:ss'),
            createBy: req.headers.authid
        }
        articles.push(newArticles)
        res.status(200).send({code:200, status:'success', message:"Article saved successfully"})
    }
    catch(err){
        res.send({code:500, status:'error', message:'Internal Server Error'})
    }
}

const __reconstrucComment = (data) => {
    let comment = []
    if(data){
        data.forEach(item => {
            const filterComment = {
                id: item.id,
                comment: item.comment,
                createdate: item.createdate,
                createBy: item.createBy,
                history: item.history
            }
            comment.push(filterComment) 
        });
    }
    return comment;
}

const getArticle = ((req, res) => {
    try{
        const id = Number(req.params.articleID)
        const dataArticle = articles.find(article => article.id === id)
        const dataComment = comments.filter(comment => comment.articleID === id)
        if (!dataArticle) {
            res.status(201).send({code:201, status:'success', message:"ARTICLE_NOT_FOUND"})
        }else{
            const comment  = __reconstrucComment(dataComment)
            const response = { ...dataArticle, comment:comment }
            res.status(200).send({code:200, status:'success', data:response})
        }
    }
    catch(err){
        res.send({code:500, status:'error', message:'Internal Server Error'})
    }
})

const updateArticles = ((req, res) => {
    try{
        const id = Number(req.params.articleID)
        const index = articles.findIndex(article => article.id === id)
        const creator = articles[index].createBy
        if(index < 0){
            res.status(400).send({code:400, status:'error', message:"ARTICLE_NOT_FOUND"})
        }else if(creator !== req.headers.authid){
            res.status(401).send({code:401, status:'error', message:"ACCESS_DENIED"})
        }else{
            articles[index].title = req.body.title
            articles[index].content = req.body.content
            articles[index].updatedate = moment().format('YYYY-MM-DD HH:mm:ss')
            res.status(200).send({code:200, status:'success',  message:"Article update successfully"})
        }
    }
    catch(err){
        if(!req.headers.authid){
            res.status(401).send({code:401, status:'error', message:"Unauthorized"})
        }else{
            res.status(500).send({code:500, status:'error', message:'Internal Server Error'})
        }
    }
})

const deleteArticle = ((req, res) => {
    try{
        const id = Number(req.params.articleID)
        const index = articles.findIndex(article => article.id === id)
        const creator = articles[index].createBy
        if(creator !== req.headers.authid){
            res.status(401).send({code:401, status:'error', message:"ACCESS_DENIED"})
        }else{
            articles.splice(index,1)
            res.status(200).send({code:200, status:'success', message:"Article deleted successfully"})
        }
    }
    catch(err){
        res.status(500).send({code:500, status:'error', message:'Internal Server Error'})
    }
})

const submitComment = async (req, res)=> {
    try{
        if(!req.body.articleID){
            res.status(400).send({code:400, status:'error', message:"ARTICLE_ID_IS_REQUIRED"})
        }else{
            const newComment = {
                id: comments.length + 1,
                articleID: req.body.articleID,
                comment: req.body.comment,
                createdate: moment().format('YYYY-MM-DD HH:mm:ss'),
                createBy: req.headers.authid
            }
            comments.push(newComment)
            res.status(200).send({code:200, status:'success', message:"Comment added successfully"})
        }
    }
    catch(err){
        res.send({code:500, status:'error', message:'Internal Server Error'})
    }
}

const detailComment = async (req, res)=> {
    try{
        const id = Number(req.params.articleID)
        const dataComments = comments.find(article => article.id === id)
        if (!dataComments) {
            res.status(201).send({code:201, status:'success', message:"ARTICLE_NOT_FOUND"})
        }else{
            res.status(200).send({code:200, status:'success', data:dataComments})
        }
    }
    catch(err){
        res.send({code:500, status:'error', message:'Internal Server Error'})
    }
}

const updateComment = ((req, res) => {
    try{
        const id = Number(req.body.commentID)
        const articleID = Number(req.body.articleID)
        const index = comments.findIndex(article => article.id === id)
        const creator = comments[index].createBy
        if(index < 0){
            res.status(400).send({code:400, status:'error', message:"COMMENT_NOT_FOUND"})
        }else if(creator !== req.headers.authid || articleID !== comments[index].articleID){
            res.status(401).send({code:401, status:'error', message:"ACCESS_DENIED"})
        }else{
            const commentHistory = []
            commentHistory.push(comments[index])
            const updateCommend = {
                id,
                articleID,
                comment: req.body.comment,
                createdate: comments[index].createdate,
                createBy: comments[index].createBy,
                history: commentHistory
            }
            comments[index] = updateCommend
            res.status(200).send({code:200, status:'success',  message:"Comment update successfully"})
        }
    }
    catch(err){
        if(!req.headers.authid){
            res.status(401).send({code:401, status:"Unauthorized"})
        }else{
            res.status(500).send({code:500, message:'Internal Server Error'})
        }
    }
})


const deleteComment = ((req, res) => {
    try{
        const id = Number(req.body.commentID)
        const articleID = Number(req.body.articleID)
        const index = comments.findIndex(comment => comment.id === id)
        const creator = comments[index].createBy
        if(creator !== req.headers.authid || articleID !== comments[index].articleID){
            res.status(401).send({code:401, status:'error', message:"ACCESS_DENIED"})
        }else{
            comments.splice(index,1)
            res.status(200).send({code:200, status:'success', message:"Article deleted successfully"})
        }
    }
    catch(err){
        res.status(500).send({code:500, status:'error', message:'Internal Server Error'})
    }
})

router.get('/sys', checkSys)
router.get('/all', getArticles) // Show All

router.post('/submit', submitArticles)              //  Create Article
router.get('/detail/:articleID', getArticle)        // Read Artilcle
router.post('/update/:articleID', updateArticles)   // Update Article
router.get('/delete/:articleID', deleteArticle)     // Delete Article

router.post('/comment/submit', submitComment)       // Create Comment
router.post('/comment/detail', detailComment)       // Read Comment
router.post('/comment/update', updateComment)       // Update Article
router.post('/comment/delete', deleteComment)    // Delete Article

module.exports = router;