DROP DATABASE join_us;
CREATE DATABASE join_us;

USE join_us;

CREATE TABLE users (
	email VARCHAR(255) PRIMARY KEY,
	created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users(email) VALUES
	('brunoguilera@hotmail.com'),
	('sel_gui@yahoo.com.br');
