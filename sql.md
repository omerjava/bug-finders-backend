# SQL queries

INSERT INTO bugs (
    bugs_name, created_by, bugs_category, bugs_like
    )
VALUES ("submit event", "slm123", "HTML+Javascript", 21);

CREATE TABLE `login_jwt`.`comments` (
`id_comment` INT NOT NULL AUTO_INCREMENT,
`comment_by` VARCHAR(255) NOT NULL,
`comment_like` INT NOT NULL,
`create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id_comment`));

SELECT bugs.bug_id, bugs.bugname, bugs.bug, bugs.category, bugs.likes,
bugs.create_time, bugs.update_time, users.username, users.user_id
FROM users
INNER JOIN bugs ON users.user_id = bugs.user_id
WHERE users.user_id=20;

SELECT users.username, bugs.bug, bugs.bug_id, bugs.bugname, comments.comment, comments.likes,
comments.create_time, comments.update_time, comments.user_id, comments.comment_id
FROM ((users
INNER JOIN bugs ON users.user_id = bugs.user_id)
INNER JOIN comments ON bugs.bug_id = comments.bug_id)
WHERE users.username="kml123";

// postgresql

CREATE TABLE students (
student_id serial PRIMARY KEY,
username VARCHAR ( 50 ) UNIQUE NOT NULL,
password VARCHAR ( 1000 ) NOT NULL,
email VARCHAR ( 255 ) UNIQUE NOT NULL,
created_on TIMESTAMP NOT NULL,
last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medewerkers
(
medewerker_id serial PRIMARY KEY,
comment text NOT NULL,
user_id integer NOT NULL,
bug_id integer NOT NULL,
created_on timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments
(
comment_id serial PRIMARY KEY,
comment text NOT NULL,
user_id integer NOT NULL,
bug_id integer NOT NULL,
created_on timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bugs
(
bug_id serial PRIMARY KEY,
bug text NOT NULL,
user_id integer NOT NULL,
created_on timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
category character varying(255) NOT NULL,
bugname character varying(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users
(
user_id serial PRIMARY KEY,
username character varying(50) NOT NULL,
password character varying(1000) NOT NULL,
email character varying(255) NOT NULL,
created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
