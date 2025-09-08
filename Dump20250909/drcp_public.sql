-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: drcp
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `public`
--

DROP TABLE IF EXISTS `public`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `public` (
  `idpublic` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `userdob` date NOT NULL,
  `usermail` varchar(45) NOT NULL,
  `userph` varchar(15) NOT NULL,
  `userhouse` varchar(45) NOT NULL,
  `userlocation` varchar(45) NOT NULL,
  `userpanchayath` varchar(45) NOT NULL,
  `userdistrict` varchar(45) NOT NULL,
  `userstate` varchar(45) NOT NULL,
  `userpass` varchar(45) NOT NULL,
  `usergender` varchar(20) NOT NULL DEFAULT 'Male',
  PRIMARY KEY (`idpublic`),
  UNIQUE KEY `idpublic_UNIQUE` (`idpublic`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `public`
--

LOCK TABLES `public` WRITE;
/*!40000 ALTER TABLE `public` DISABLE KEYS */;
INSERT INTO `public` VALUES (100,'Addwin','2005-04-30','addwin23cs@cce.edu.in','8086198653','Alanolikkal','Vasupuram','Mattathurkunnu','Thrissur','Kerala','add2005','Male'),(101,'Emmauel','2005-04-30','emma@cce.edu.in','8086198653','K','Thrissur','Thrissur','Thrissur','Kerala','emm2005','Male'),(102,'Abhijith','2005-04-30','abi@cce.edu.in','8086198653','C','Egandiyor','Thrissur','Thrissur','Kerala','abi','Male'),(103,'Dhasarath','2025-09-10','dhas@gmail.com','1234567890','Alanolikkal','Vasupuram','Mattathurkunnu','Thrissur','Kerala','dhas','Male');
/*!40000 ALTER TABLE `public` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-09  0:03:44
