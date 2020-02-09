const express = require('express');
const app = express();
const dbMiddleware = require('../middleware/middleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//buat port
const httpPort = 8888;

const round = 10;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//use dbMiddleware
app.use(dbMiddleware);

//routes
app.post('/register', async (req,res) => {
    const {db} = res.locals;
    try {
        bcrypt.hash(req.body.password, round, (err, hash) =>  { 
            const result = db.collection('users').insertOne({
                username: req.body.username, password: hash
            });
            res.status(200).send("Register berhasil");
        });
    } catch {
        console.log(err);
    }
});

//listen ke port yang dibuat
app.listen(httpPort, () => {
    console.log('Listening to port', httpPort);
});