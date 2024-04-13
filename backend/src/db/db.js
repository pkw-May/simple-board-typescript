const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((error) => {
	if (error) {
		console.error(error);
	};
	console.log('Successfully connected to the database');
});

module.exports = connection;
