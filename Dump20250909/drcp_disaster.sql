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
-- Table structure for table `disaster`
--

DROP TABLE IF EXISTS `disaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disaster` (
  `did` int unsigned NOT NULL AUTO_INCREMENT,
  `ddate` date DEFAULT NULL,
  `dlocation` varchar(255) DEFAULT NULL,
  `dlatitude` decimal(10,4) DEFAULT NULL,
  `dlongtitude` decimal(10,4) DEFAULT NULL,
  `dtype` varchar(100) DEFAULT NULL,
  `ddistrict` varchar(100) DEFAULT NULL,
  `reported_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dstatus` varchar(20) NOT NULL DEFAULT 'Active',
  `ddeathcount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`did`),
  UNIQUE KEY `did_UNIQUE` (`did`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disaster`
--

LOCK TABLES `disaster` WRITE;
/*!40000 ALTER TABLE `disaster` DISABLE KEYS */;
INSERT INTO `disaster` VALUES (1,'2025-09-05','Kodakara',23.5600,45.5600,'Flood','Thrissur','2025-09-05 11:09:49','Active',0),(2,'2025-09-04','Aloor',76.8700,45.7600,'Flood','Thrissur','2025-09-05 11:11:44','Inactive',0),(3,'2025-09-05','Kodaly',56.7800,22.4500,'Fire','Thrissur','2025-09-05 11:13:51','Progress',6),(4,'2025-09-05','IJK',23.0000,34.0000,'Fire','Thrissur','2025-09-05 12:22:45','Inactive',0),(5,'2025-09-05','h',7.0000,8.0000,'Earthquake','Kasaragod','2025-09-05 12:55:12','Inactive',0),(6,'2025-09-05','J',8.0000,0.0000,'Storm','Kasaragod','2025-09-05 13:15:34','Inactive',0),(7,'2025-09-05','Kodakara',87.0000,90.0000,'Fire','Ernakulam','2025-09-05 16:57:15','Inactive',0);
/*!40000 ALTER TABLE `disaster` ENABLE KEYS */;
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
