const { MongoClient } = require('mongodb');

//buat dbconfig dengan mongodb
const dbConfig = {
    uri:'mongodb://localhost:27017'
}
//buat connection dan mengembalikan db users

const dbConnection = async () => {
    const client = await MongoClient.connect(dbConfig.uri, {useNewUrlParser:true});
    if (client) {
        console.log('success');
    }
    return client.db('users');
}

//export connection yang sudah dibuat
module.exports = dbConnection;