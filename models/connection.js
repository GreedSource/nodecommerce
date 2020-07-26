var mysql = require('mysql');
/* 
var db_config = {
    host: 'nodecommerce.mariadb.database.azure.com',
    port:3306,
    user:'greed@nodecommerce',
    password: 'E6v0D0z8',
    database:'nodecommerce',
    insecureAuth: true
};
 */
var db_config = {
    host: 'localhost',
    port:3306,
    user:'root',
    password: '',
    database:'nodecommerce',
    insecureAuth: true
};

var connection;
  
var handleDisconnect = () => {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
    connection.connect((err) => {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', (err) => {
        console.log('db error', err.code);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            console.log(err.code);
            handleDisconnect();                       // lost due to either server restart, or a
        }
    });
}

handleDisconnect();

module.exports = connection;