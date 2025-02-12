const mysql = require('mysql');
const readlineSync = require('readline-sync');
const fs = require('fs');

const passwordConfig = {
    host: 'localhost',
    user: 'root'
};

const passwordFile = 'password.json';

async function setPassword(password) {
    const connection = mysql.createConnection(passwordConfig);
    try {
        connection.query(`ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '${password}';`);
        console.log('Password set successfully.');
    } catch (err) {
        console.error('Error creating password:', err);
    } finally {
        connection.end();
    }
}

async function main() {
    const password = readlineSync.question('Please enter a new password for the MySQL root user (input will be hidden): ', {
        hideEchoBack: true
    });

    fs.writeFileSync(passwordFile, JSON.stringify({password}));

    await setPassword(password);
}

main();
