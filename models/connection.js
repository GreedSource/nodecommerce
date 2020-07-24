var mysql = require('mysql');
port = process.env.PORT || 4205;

//if (port === 4205){
    var connection = mysql.createConnection({
        host: 'us-cdbr-east-02.cleardb.com',
        port:3306,
        user:'bb26f1598c0e8e',
        password: 'fac0cf03',
        database:'heroku_ccbf50efafee06f',
        insecureAuth: true
    });
/*
}else{
    console.log('Error de conexión');
}
*/
connection.connect();

module.exports = connection;