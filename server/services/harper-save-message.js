const sql = require('mssql');

async function harperSaveMessage(message, username, room) {
  const dbConfig = {
    server: 'TTNPL-531', // Hostname or IP address
    database: 'chatbot_app',
    authentication: {
      type: 'ntlm', // Use NTLM for Windows Authentication
      options: {
        domain: 'WORKGROUP', // Your domain or workgroup
        userName: 'Harshit Pandey', // Your Windows username
        password: 'rootroot' // Your Windows password
      }
    },
    options: {
      encrypt: true, // Use this if you're on Windows Azure
      trustServerCertificate: true, // For local dev / self-signed certs
      instanceName: 'SQLEXPRESS', // Use this if you have a named instance
      port: 1433, // Ensure this is the correct port
    },
  };

  try {
    // Connect to the database
    let pool = await sql.connect(dbConfig);
    console.log("DB connected");

    // Insert the message into the database
    let result = await pool.request()
      .input('message', sql.NVarChar, message)
      .input('username', sql.NVarChar, username)
      .input('room', sql.NVarChar, room)
      .query(`
        INSERT INTO chatbot_tbl (message, username, room)
        VALUES (@message, @username, @room)
      `);

    // Close the connection
    pool.close();

    return result;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = harperSaveMessage;
