const connectDb = require('../connector/dbConnector');

const dbConnection = connectDb();

//buat middleware
const dbMiddleware = async (req, res, next) => {
    if(!res.locals.db){   
        const db = await dbConnection;
        res.locals.db = db  
    }
    next();
}

//export dbmiddleware
module.exports = dbMiddleware;