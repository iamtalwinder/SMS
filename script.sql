USE sms;

CREATE TABLE users(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	fname VARCHAR(20) NOT NULL,
	lname VARCHAR(20) NOT NULL,
	email VARCHAR(35) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	role ENUM('admin', 'staff', 'student') NOT NULL DEFAULT 'student',
	reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
) ENGINE = INNODB;

CREATE TABLE token(
	auth_token VARCHAR(1000) NOT NULL
) ENGINE = INNODB;

CREATE TABLE student(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	DOB DATE NOT NULL,
	course ENUM('BCA', 'BBA') DEFAULT 'BCA',
	sem ENUM('1', '2', '3', '4') DEFAULT '1',
	PRIMARY KEY(id),
	FOREIGN KEY (id)
	REFERENCES users(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
) ENGINE = INNODB;

INSERT INTO users
(fname, lname, email, password, role)
VALUES 
(
	'Talwinder', 
	'Singh', 
	'singhtalwinder34@yahoo.com',
	'$2a$10$3cO4gMgw0.6ehJ7Fb9eiOOZjnauB0dir3FH/HiNKCGKIR/x9Fogqu',
	'admin'
);