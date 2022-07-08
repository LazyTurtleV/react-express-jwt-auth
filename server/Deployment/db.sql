CREATE DATABASE Auth;
USE Auth;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    is_activated INT,
    activation_link VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE tokens (
    user_id INT NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

DELIMITER //
CREATE PROCEDURE spiCreateUser(
    IN _user_email VARCHAR(255),
    IN _user_password VARCHAR(255),
    IN _activation_link VARCHAR(255)
)
BEGIN 
    INSERT INTO Auth.users (email, user_password, activation_link) VALUES (_user_email, _user_password, _activation_link);
    SELECT id from Auth.users WHERE email = _user_email;
END//

CREATE PROCEDURE spiGetUser(
    IN _user_email VARCHAR(255)
)
BEGIN 
    SELECT id, email, user_password from Auth.users WHERE email = _user_email;
END//

CREATE PROCEDURE spiUpdateUserToken(
    IN _user_id VARCHAR(255),
    IN _refresh_token VARCHAR(255)
)
BEGIN 
    IF EXISTS (SELECT * from Auth.tokens WHERE user_id = _user_id) THEN
        UPDATE Auth.tokens SET refresh_token = _refresh_token WHERE user_id = _user_id;
    ELSE
        INSERT INTO Auth.tokens (user_id, refresh_token) VALUES (_user_id, _refresh_token);
    END IF;
END//

CREATE PROCEDURE spiRemoveToken(
    IN _refresh_token VARCHAR(255)
)
BEGIN 
    DELETE FROM Auth.tokens WHERE refresh_token = _refresh_token;
END//

CREATE PROCEDURE spiActivateUser(
    IN _activation_link VARCHAR(255)
)
BEGIN 
    SET SQL_SAFE_UPDATES = 0;
    UPDATE Auth.users SET is_activated = 1 WHERE activation_link = _activation_link;
    SET SQL_SAFE_UPDATES = 1;
END//

CREATE PROCEDURE spiValidateEmail(
    IN _user_email VARCHAR(255)
)
BEGIN
    SELECT
        CASE 
        WHEN EXISTS (SELECT * FROM Auth.users WHERE email = _user_email) THEN 0 
        ELSE 1 
    END;
END//

CREATE PROCEDURE spiTokenExist(
    IN _user_id VARCHAR(255)
)
BEGIN
    SELECT 
        CASE 
        WHEN EXISTS (SELECT * FROM Auth.tokens WHERE user_id = _user_id) THEN 1 
        ELSE 0 
    END;
END//

DELIMITER ;