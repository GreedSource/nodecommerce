var mysql = require('mysql');
port = process.env.PORT || 4205;

if (port === 4205){
    var connection = mysql.createConnection({
        host: 'localhost',
        port:3306,
        user:'root',
        password: '',
        database:'nodecommerce',
        insecureAuth: true
    });
}else{
    console.log('Error de conexión');
}

connection.connect();

module.exports = connection;