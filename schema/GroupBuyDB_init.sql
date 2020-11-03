DROP DATABASE IF EXISTS GroupBuyDB;
CREATE DATABASE GroupBuyDB;
USE GroupBuyDB;

CREATE TABLE Users (
    `userId`        INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    `firstName`     VARCHAR (50) NOT NULL,              
    `lastName`      VARCHAR (50) NOT NULL,              
    `email`         VARCHAR (50) NOT NULL,                  
    `password`      VARCHAR (20) NOT NULL,
    `phoneNumber`   VARCHAR (20),
    PRIMARY KEY     (`userId`)              
);

CREATE TABLE Teams (
    `teamId`        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `status`        VARCHAR (20) NOT NULL,
    `maxGoupSize`   INT UNSIGNED NOT NULL,
    `initiatorId`   INT UNSIGNED NOT NULL, 
    PRIMARY KEY     (`teamId`),
    FOREIGN KEY     (`initiatorId`) REFERENCES Users(`userId`)
);

CREATE TABLE Products (
    `productId`     INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `productName`   VARCHAR (100) NOT NULL,
    `company`       VARCHAR (50) NOT NULL,
    `price`         REAL NOT NULL,
    `link`          VARCHAR (1000) NOT NULL,
    `tag`           VARCHAR (200) NOT NULL,
    `description`   VARCHAR (1000),
    PRIMARY KEY     (`productId`)
);

CREATE TABLE UserInTeam (
    `userId`        INT UNSIGNED NOT NULL,
    `teamId`        INT UNSIGNED NOT NULL,
    FOREIGN KEY     (`userId`) REFERENCES Users(`userId`),
    FOREIGN KEY     (`teamId`) REFERENCES Teams(`teamId`)
);

CREATE TABLE TeamPurchase (
    `teamId`        INT UNSIGNED NOT NULL,
    `productId`     INT UNSIGNED NOT NULL,
    `purchaseDate`  DATE,
    PRIMARY KEY     (`teamId`, `productId`),
    FOREIGN KEY     (`teamId`)    REFERENCES Teams(`teamId`),
    FOREIGN KEY     (`productId`) REFERENCES Products(`productId`)
);

CREATE TABLE Reviews (
    `reviewerId`     INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId`         INT UNSIGNED NOT NULL,
    `teamId`         INT UNSIGNED NOT NULL,
    `productId`      INT UNSIGNED NOT NULL,
    `rating`         FLOAT NOT NULL,
    `description`    VARCHAR (1000) NOT NULL,
    PRIMARY KEY     (`reviewerId`, `userId`, `teamId`, `productId`),
    FOREIGN KEY     (`reviewerId`) REFERENCES Users(`userId`),
    FOREIGN KEY     (`userId`) REFERENCES Users(`userId`),
    FOREIGN KEY     (`teamId`) REFERENCES Teams(`teamId`),
    FOREIGN KEY     (`productId`) REFERENCES Products(`productId`)
);

CREATE TABLE Follow (
    /* user1 --follows--> user2 */
    `userId1`       INT UNSIGNED NOT NULL,
    `userId2`       INT UNSIGNED NOT NULL,
    FOREIGN KEY     (`userId1`) REFERENCES Users(`userId`),
    FOREIGN KEY     (`userId2`) REFERENCES Users(`userId`)
);