const express 		  = require('express');
const app             = express();
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose')
const cors            = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv/config')

// mongoose.connect(process.env.DB_CREDENTIAL, { useNewUrlParser:true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1  })
//     .then((result) => console.log('Connected to MongoDB'))
//     .catch((err) => console.log("Conenction error ", err))

app.use(express.json())
app.use(bodyParser.json());
app.use(cors())
const articles      = require('./server/api/articles');

app.use('/article', articles)

app.use((err, res)=> {
    if(err){
        res.status(404).send({status:404, message:"REQUEST_NOT_FOUND"})
    } 
});

app.listen(3100)