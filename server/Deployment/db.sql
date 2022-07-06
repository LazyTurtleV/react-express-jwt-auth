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
    INSERT INTO Users (email, user_password, activation_link) VALUES (_user_email, _user_password, _activation_link);
END//

CREATE PROCEDURE spiUpdateUserRefreshToken(
    IN _user_email VARCHAR(255),
    IN _user_password VARCHAR(255),
    IN _activation_link VARCHAR(255)
)
BEGIN 
    INSERT INTO Users (email, user_password, activation_link) VALUES (_user_email, _user_password, _activation_link);
END//

CREATE PROCEDURE spiValidateEmail(
    IN _user_email VARCHAR(255),
    OUT _exist INT
)
BEGIN
    SELECT
        CASE 
        WHEN EXISTS (SELECT * FROM Auth.users WHERE email = _user_email) THEN 0 
        ELSE 1 
    END
    INTO _exist;
END//

CREATE PROCEDURE spiTokenExist(
    IN _user_id VARCHAR(255),
    OUT _exist INT
)
BEGIN
    SELECT 
        CASE 
        WHEN EXISTS (SELECT * FROM Auth.tokens WHERE user_id = _user_id) THEN 1 
        ELSE 0 
    END;
END//

DELIMITER ;