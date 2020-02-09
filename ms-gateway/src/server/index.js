const express = require('express');
const app = express();
const dbMiddleware = require('../middleware/middleware');
const httpProxy = require('express-http-proxy');

//buat port
const httpPort = 9000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//use dbMiddleware
app.use(dbMiddleware);

//routes
app.get('/', async (req,res) => {
    res.send('SIMPLE MS GATEWAY');
});

app.get('/profil', (req, res, next) => {
    const userServiceProxy = httpProxy('http://localhost:8887/profil');
    userServiceProxy(req, res, next);
});

app.post('/login', (req, res, next) => {
    const userServiceProxy = httpProxy('http://localhost:8889/login');
    userServiceProxy(req, res, next);
});

app.post('/register', (req, res, next) => {
    const userServiceProxy = httpProxy('http://localhost:8888/register');
    userServiceProxy(req, res, next);
});

//listen ke port yang dibuat
app.listen(httpPort, () => {
    console.log('Listening to port', httpPort);
});