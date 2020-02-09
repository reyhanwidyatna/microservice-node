const express = require('express');
const app = express();
const dbMiddleware = require('../middleware/middleware');
const jwt = require('jsonwebtoken');

//buat port
const httpPort = 8889;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//use dbMiddleware
app.use(dbMiddleware);

//routes
app.post('/login', async (req,res) => {
    const {db} = res.locals;
    const password = req.param('password');
    const result = await db.collection('users').find({password}).toArray();
    if(result){
        console.log('login success'); 
        jwt.sign({}, 'secretKey', (err,token) => {
            res.status(200).send(token);
        });
    }
});

//listen ke port yang dibuat
app.listen(httpPort, () => {
    console.log('Listening to port', httpPort);
});