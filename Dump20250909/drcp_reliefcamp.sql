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
-- Table structure for table `reliefcamp`
--

DROP TABLE IF EXISTS `reliefcamp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reliefcamp` (
  `rnumber` int unsigned NOT NULL AUTO_INCREMENT,
  `rname` varchar(25) NOT NULL,
  `rlocation` varchar(20) NOT NULL,
  `rward` int NOT NULL,
  `rdis` varchar(35) NOT NULL,
  `rstate` varchar(25) NOT NULL,
  `rpan` varchar(35) NOT NULL,
  `rph` varchar(15) NOT NULL,
  `rpeople` int NOT NULL,
  `rroom` int NOT NULL,
  `rwash` int NOT NULL,
  `rkit` int NOT NULL,
  PRIMARY KEY (`rnumber`),
  UNIQUE KEY `rnum_UNIQUE` (`rnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reliefcamp`
--

LOCK TABLES `reliefcamp` WRITE;
/*!40000 ALTER TABLE `reliefcamp` DISABLE KEYS */;
INSERT INTO `reliefcamp` VALUES (1,'St. Joseph','Vasupuram',21,'Thrissur','Kerala','Mattathurkunnu','8086198653',120,10,8,2),(2,'St. Mary','Vasu',20,'Idukki','Bihar','Mattathur','23456',120,3,2,1);
/*!40000 ALTER TABLE `reliefcamp` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-09  0:03:45
