const express = require('express');
const app = express();
const dbMiddleware = require('../middleware/middleware');
const jwt = require('jsonwebtoken');

//buat port
const httpPort = 8887;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//use dbMiddleware
app.use(dbMiddleware);

//routes
app.get('/profil', verifyToken, async (req,res) => {
    const {db} = res.locals;
    const username = req.param('username');
    const result = await db.collection('users').find({username: {$eq: username}}).toArray();
    jwt.verify(req.token, 'secretKey', (err,authData) => {
        if (!req.token) {
            res.sendStatus(403);
        } else {
            res.status(200).send(result);
            console.log(authData);   
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.param('authorization');
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();  
    } else {
        res.sendStatus(403);
    }
}

//listen ke port yang dibuat
app.listen(httpPort, () => {
    console.log('Listening to port', httpPort);
});