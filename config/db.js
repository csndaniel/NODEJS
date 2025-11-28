const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// kapcsolat teszt
connection.connect((err) => {
    if (err) {
        console.error("❌ Adatbázis hiba:", err);
    } else {
        console.log("✅ Adatbázishoz csatlakozva.");
    }
});

module.exports = connection;
