--1 FIND THE EARLIEST DATE A USER JOINED. (Ex: May 2nd 2016)
SELECT DATE_FORMAT(MIN(created_at), "%M %D %Y") AS earliest_date FROM users;

--2 FIND THE EMAIL OF THE EARLIEST USER
SELECT * FROM users 
WHERE created_at = (SELECT MIN(created_at) FROM users);

--3 NUMBER OF USERS ACCORDING TO THE MONTH THEY JOINED
SELECT MONTHNAME(created_at) AS month, COUNT(*) AS count 
FROM users 
GROUP BY month 
ORDER BY count DESC;

--4 COUNT NUMBER OF USERS WITH YAHOO EMAILS
SELECT COUNT(*) AS yahoo_users 
FROM users 
WHERE email LIKE "%@yahoo%";

--5 CALCULATE TOTAL NUMBER OF USERS FOR EACH EMAIL HOST
SELECT 
	CASE
		WHEN email LIKE "%@yahoo%" THEN "yahoo" 
		WHEN email LIKE "%@gmail%" THEN "gmail" 
		WHEN email LIKE "%@hotmail%" THEN "hotmail"
		ELSE "other" 
	END AS provider, 
	COUNT(*) AS total_users
FROM users 
GROUP BY provider
ORDER BY total_users DESC;
