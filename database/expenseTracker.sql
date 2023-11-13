DROP DATABASE tracker;
CREATE DATABASE tracker;
USE tracker;

/*
DROP TABLE IF EXISTS `tracker`.`user`;

CREATE TABLE IF NOT EXISTS `tracker`;.`user` (
    `userID` INT NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(45) NULL,
    PRIMARY KEY (`userID`)

);*/

DROP TABLE IF EXISTS `tracker`.`category`;

CREATE TABLE IF NOT EXISTS `tracker`.`category`(
    `catID` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    PRIMARY KEY(`catID`)

);

DROP TABLE IF EXISTS `tracker`.`expense`;

CREATE TABLE IF NOT EXISTS `tracker`.`expense`(

    `expenseID` INT NOT NULL AUTO_INCREMENT,
    `catID` INT NOT NULL,
    `name` VARCHAR(45) NULL,
    `amount` NUMERIC,
    `date` DATE,
    `memo` VARCHAR(45) NULL,
    PRIMARY KEY(`expenseID`)

);
/*
cd expenseTracker
npm install
npm run dev

export
edit last one
filter and search
*/