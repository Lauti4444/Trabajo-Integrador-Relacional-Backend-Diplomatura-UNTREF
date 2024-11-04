-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cinema
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `actores`
--

DROP TABLE IF EXISTS `actores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actores` (
  `id_actor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  PRIMARY KEY (`id_actor`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actores`
--

LOCK TABLES `actores` WRITE;
/*!40000 ALTER TABLE `actores` DISABLE KEYS */;
INSERT INTO `actores` VALUES (1,'Lili','Reinhart'),(2,'Casey','Cott'),(3,'Camila','Mendes'),(4,'Marisol','Nichols'),(5,'Madelaine','Petsch'),(6,'Madchen','Amick'),(8,'Robert','Downey Jr'),(9,'Chris','Evans'),(10,'Mark','Ruffalo'),(11,'Chris','Hemsworth'),(12,'Scarlett','Johansson'),(13,'Jeremy','Renner'),(14,'Millie Bobby','Brown'),(15,'Henry','Cavill'),(16,'Sam','Claflin'),(17,'Helena Bonham','Carter'),(18,'Louis','Partridge'),(19,'Adeel','Akhtar'),(20,'Megan','Fox'),(21,'Olivia','Colman'),(22,'Matt','Smith'),(23,'Tobias','Menzies'),(24,'Vanesa','Kirby');
/*!40000 ALTER TABLE `actores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(255) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Pelicula'),(2,'Serie');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido`
--

DROP TABLE IF EXISTS `contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenido` (
  `id_contenido` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `categoria` int DEFAULT NULL,
  `busqueda` varchar(255) DEFAULT NULL,
  `resumen` varchar(255) DEFAULT NULL,
  `temporadas` int DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_contenido`),
  KEY `categoria_idx` (`categoria`),
  CONSTRAINT `contenido_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido`
--

LOCK TABLES `contenido` WRITE;
/*!40000 ALTER TABLE `contenido` DISABLE KEYS */;
INSERT INTO `contenido` VALUES (1,'The Crown',2,'The Crown, Drama, Suceso Real, Claire Fox, Olivia Colman, Matt Smith, Tobias Menzies, Vanesa Kirby, Helena Bonham Carter','Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.',4,NULL,'./posters/1.jpg','https://www.youtube.com/embed/JWtnJjn6ng0'),(2,'Riverdale',2,'Riverdale, Drama, Misterio, Ficción, Lili Reinhart, Casey Cott, Camila Mendes, Marisol Nichols, Madelaine Petsch, Mädchen Amick','El paso a la edad adulta incluye sexo, romance, escuela y familia. Para Archie y sus amigos, también hay misterios oscuros.',5,NULL,'./posters/2.jpg','https://www.youtube.com/embed/HxtLlByaYTc'),(3,'Avengers: End Game',1,'Vengadores, Los vengadores, Marvel, The Avengers: End Game, Aventura, Sci-Fi, Acción, Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner','Después de los devastadores eventos de los Vengadores: Infinity War (2018), el universo está en ruinas.',NULL,97,'./posters/8.jpg','https://www.youtube.com/embed/TcMBFSGVi1c'),(4,'Enola Holmes',1,'Enola Holmes, Ficción, Drama, Misterio, Millie Bobby Brown, Henry Cavill, Sam Claflin, Helena Bonham Carter, Louis Partridge, Adeel Akhtar','La hermana menor de Sherlock, descubre que su madre ha desaparecido y se dispone a encontrarla.',NULL,97,'./posters/6.jpg','https://www.youtube.com/embed/3t1g2pa355k');
/*!40000 ALTER TABLE `contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido_actores`
--

DROP TABLE IF EXISTS `contenido_actores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenido_actores` (
  `id_contenido` int NOT NULL,
  `id_actor` int NOT NULL,
  PRIMARY KEY (`id_contenido`,`id_actor`),
  KEY `id_actor_idx` (`id_actor`),
  CONSTRAINT `id_actor` FOREIGN KEY (`id_actor`) REFERENCES `actores` (`id_actor`),
  CONSTRAINT `id_contenido2` FOREIGN KEY (`id_contenido`) REFERENCES `contenido` (`id_contenido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_actores`
--

LOCK TABLES `contenido_actores` WRITE;
/*!40000 ALTER TABLE `contenido_actores` DISABLE KEYS */;
INSERT INTO `contenido_actores` VALUES (2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(3,8),(3,9),(3,10),(3,11),(3,12),(3,13),(4,14),(4,15),(4,16),(1,17),(4,17),(4,18),(4,19),(1,20),(1,21),(1,22),(1,23),(1,24);
/*!40000 ALTER TABLE `contenido_actores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido_generos`
--

DROP TABLE IF EXISTS `contenido_generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenido_generos` (
  `id_contenido` int NOT NULL,
  `id_genero` int NOT NULL,
  PRIMARY KEY (`id_contenido`,`id_genero`),
  KEY `id_genero_idx` (`id_genero`),
  CONSTRAINT `id_contenido` FOREIGN KEY (`id_contenido`) REFERENCES `contenido` (`id_contenido`),
  CONSTRAINT `id_genero` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id_genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_generos`
--

LOCK TABLES `contenido_generos` WRITE;
/*!40000 ALTER TABLE `contenido_generos` DISABLE KEYS */;
INSERT INTO `contenido_generos` VALUES (1,1),(2,1),(4,1),(1,2),(2,3),(4,3),(2,4),(4,4),(3,5),(3,6),(3,7);
/*!40000 ALTER TABLE `contenido_generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `nombre_genero` varchar(255) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Drama'),(2,'Suceso Real'),(3,'Mistero'),(4,'Ficcion'),(5,'Accion'),(6,'Aventura'),(7,'Ciencia Ficcion'),(8,'Fantasia'),(9,'Comedia');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31 20:53:16
