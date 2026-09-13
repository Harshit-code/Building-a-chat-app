const sql = require('mssql');

const dbConnect = () => {
    const config = {
        server: 'TTNPL-531', // Your server hostname
        database: 'chatbot_app',
        options: {
            encrypt: true, // Enable encryption
            trustServerCertificate: true, // Trust the self-signed certificate
            instanceName: 'SQLEXPRESS', // Use this if you have a named instance
            port: 1433, // Ensure this is the correct port
        },
        authentication: {
            type: 'ntlm',
            options: {
                domain: 'WORKGROUP',
                userName: 'Harshit Pandey', // Your Windows username
                password: 'rootroot', // Your Windows password
            },
        },
    };

    const connection = new sql.ConnectionPool(config);  
    connection.connect(err => {
        if (err) {
            console.log("Connection Error: ", err.message);
        } else {
            console.log("Connected");
        }
    });
}
module.exports = dbConnect;
