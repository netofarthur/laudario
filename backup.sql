-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for osx10.15 (x86_64)
--
-- Host: localhost    Database: laudario
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add especialidade',7,'add_especialidade'),(26,'Can change especialidade',7,'change_especialidade'),(27,'Can delete especialidade',7,'delete_especialidade'),(28,'Can view especialidade',7,'view_especialidade'),(29,'Can add exame',8,'add_exame'),(30,'Can change exame',8,'change_exame'),(31,'Can delete exame',8,'delete_exame'),(32,'Can view exame',8,'view_exame'),(33,'Can add grupo diagnostico',9,'add_grupodiagnostico'),(34,'Can change grupo diagnostico',9,'change_grupodiagnostico'),(35,'Can delete grupo diagnostico',9,'delete_grupodiagnostico'),(36,'Can view grupo diagnostico',9,'view_grupodiagnostico'),(37,'Can add mascara',10,'add_mascara'),(38,'Can change mascara',10,'change_mascara'),(39,'Can delete mascara',10,'delete_mascara'),(40,'Can view mascara',10,'view_mascara'),(41,'Can add topico normal',11,'add_topiconormal'),(42,'Can change topico normal',11,'change_topiconormal'),(43,'Can delete topico normal',11,'delete_topiconormal'),(44,'Can view topico normal',11,'view_topiconormal'),(45,'Can add topico anormal builder',12,'add_topicoanormalbuilder'),(46,'Can change topico anormal builder',12,'change_topicoanormalbuilder'),(47,'Can delete topico anormal builder',12,'delete_topicoanormalbuilder'),(48,'Can view topico anormal builder',12,'view_topicoanormalbuilder'),(49,'Can add topico anormal',13,'add_topicoanormal'),(50,'Can change topico anormal',13,'change_topicoanormal'),(51,'Can delete topico anormal',13,'delete_topicoanormal'),(52,'Can view topico anormal',13,'view_topicoanormal'),(53,'Can add nome da variavel',14,'add_nomedavariavel'),(54,'Can change nome da variavel',14,'change_nomedavariavel'),(55,'Can delete nome da variavel',14,'delete_nomedavariavel'),(56,'Can view nome da variavel',14,'view_nomedavariavel'),(57,'Can add variavel',14,'add_variavel'),(58,'Can change variavel',14,'change_variavel'),(59,'Can delete variavel',14,'delete_variavel'),(60,'Can view variavel',14,'view_variavel');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$180000$sU9sqaSaQPgC$ukXJOxMu1nLR3d5n3SBFKmAWDmlCTFgGVx0BC5vwrpU=','2020-07-14 02:39:13.886634',1,'admin','','','admin@localhost',1,1,'2020-06-12 04:52:40.450342'),(6,'pbkdf2_sha256$180000$4qAfToUpAgxl$4qquLTjJ2knEcSM5N1jLOocNq+QTnZ4ifHBWVJs7YPU=','2020-07-14 02:39:48.429757',0,'arthur','','','netofarthur@gmail.com',0,1,'2020-07-09 19:14:34.503011');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=534 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2020-06-12 15:52:51.056722','1','Vascular',1,'[{\"added\": {}}]',7,1),(2,'2020-06-12 15:53:03.110575','1','Ultrassom',1,'[{\"added\": {}}]',8,1),(3,'2020-06-12 15:53:40.642837','1','Geral',1,'[{\"added\": {}}]',9,1),(4,'2020-06-12 15:54:17.706529','1','Não classificados',2,'[{\"changed\": {\"fields\": [\"Nome\"]}}]',9,1),(5,'2020-06-12 15:56:46.827408','1','US de Carótidas',1,'[{\"added\": {}}]',10,1),(6,'2020-06-12 15:59:09.233854','1','Carótidas',1,'[{\"added\": {}}]',11,1),(7,'2020-06-12 16:00:00.159886','2','Artérias vertebrais',1,'[{\"added\": {}}]',11,1),(8,'2020-06-12 16:03:43.784988','3','Medidas dos complexos medio-intimais',1,'[{\"added\": {}}]',11,1),(9,'2020-06-12 16:09:06.812219','4','Picos de velocidades sistólica e diastólica',1,'[{\"added\": {}}]',11,1),(10,'2020-06-12 16:12:41.270277','1','Placas Bulbos (sem repercussão hemodinâmica)',1,'[{\"added\": {}}]',13,1),(11,'2020-06-12 16:14:52.324615','2','Fluxo reverso (vertebral direita)',1,'[{\"added\": {}}]',13,1),(12,'2020-06-12 16:15:55.530818','3','Fluxo reverso (vertebral esquerda)',1,'[{\"added\": {}}]',13,1),(13,'2020-06-12 16:18:00.656187','4','Espessamento medio-intimal das carótidas',1,'[{\"added\": {}}]',13,1),(14,'2020-06-12 16:19:18.255328','1','Estenose de carótidas (SRU)',1,'[{\"added\": {}}]',12,1),(15,'2020-06-12 16:23:16.791733','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(16,'2020-06-12 16:23:38.938657','3','Medidas dos complexos medio-intimais',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(17,'2020-06-12 16:24:28.053277','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(18,'2020-06-12 16:25:00.324975','3','Medidas dos complexos medio-intimais',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(19,'2020-06-12 16:27:10.525737','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(20,'2020-06-12 16:59:20.510453','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(21,'2020-06-13 18:41:40.481201','1','Variavel object (1)',1,'[{\"added\": {}}]',14,1),(22,'2020-06-13 18:42:03.034327','2','Variavel object (2)',1,'[{\"added\": {}}]',14,1),(23,'2020-06-13 19:14:56.627655','2','Espessura intimal esquerda',2,'[{\"changed\": {\"fields\": [\"Nome amigavel\"]}}]',14,1),(24,'2020-06-13 19:15:09.300037','1','Espessura intimal direita',2,'[{\"changed\": {\"fields\": [\"Nome amigavel\"]}}]',14,1),(25,'2020-06-13 19:16:51.487876','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(26,'2020-06-13 19:18:03.719456','3','ACCD (sistólica)',1,'[{\"added\": {}}]',14,1),(27,'2020-06-13 19:18:32.809784','4','ACCD diastólica',1,'[{\"added\": {}}]',14,1),(28,'2020-06-13 19:18:51.768568','5','ACID (sistólica)',1,'[{\"added\": {}}]',14,1),(29,'2020-06-13 19:19:10.224816','6','ACID (diastólica)',1,'[{\"added\": {}}]',14,1),(30,'2020-06-13 19:19:29.032023','7','ACED (sistólica)',1,'[{\"added\": {}}]',14,1),(31,'2020-06-13 19:19:42.685856','8','ACED (diastólica)',1,'[{\"added\": {}}]',14,1),(32,'2020-06-13 19:19:53.837869','9','AVD (sistólica)',1,'[{\"added\": {}}]',14,1),(33,'2020-06-13 19:20:10.404957','10','AVD (diastólica)',1,'[{\"added\": {}}]',14,1),(34,'2020-06-13 19:20:23.828353','11','ACCE (sistólica)',1,'[{\"added\": {}}]',14,1),(35,'2020-06-13 19:20:34.390088','12','ACCE (diastólica)',1,'[{\"added\": {}}]',14,1),(36,'2020-06-13 19:20:46.549094','13','ACIE (sistólica)',1,'[{\"added\": {}}]',14,1),(37,'2020-06-13 19:20:58.861661','14','ACIE (diastólica)',1,'[{\"added\": {}}]',14,1),(38,'2020-06-13 19:21:13.180911','15','ACEE (sistólica)',1,'[{\"added\": {}}]',14,1),(39,'2020-06-13 19:21:23.836788','16','ACEE (diastólica)',1,'[{\"added\": {}}]',14,1),(40,'2020-06-13 19:21:39.833231','17','AVE (sistólica)',1,'[{\"added\": {}}]',14,1),(41,'2020-06-13 19:21:53.433813','18','AVE (diastólica)',1,'[{\"added\": {}}]',14,1),(42,'2020-06-13 19:27:30.109623','4','ACCD (diastólica)',2,'[{\"changed\": {\"fields\": [\"Nome amigavel\"]}}]',14,1),(43,'2020-06-13 19:29:01.596631','18','AVE diastólica',2,'[{\"changed\": {\"fields\": [\"Nome amigavel\"]}}]',14,1),(44,'2020-06-13 19:29:23.137526','17','AVE (sistólica)',2,'[]',14,1),(45,'2020-06-13 19:29:34.081531','18','AVE (diastólica)',2,'[{\"changed\": {\"fields\": [\"Nome amigavel\"]}}]',14,1),(46,'2020-06-13 19:32:33.960292','11','ACCE (sistólica)',2,'[{\"changed\": {\"fields\": [\"Unidade medida\"]}}]',14,1),(47,'2020-06-13 19:42:18.914453','18','AVE (diastólica)',2,'[{\"changed\": {\"fields\": [\"Unidade medida\"]}}]',14,1),(48,'2020-06-13 19:42:38.167005','18','AVE (diastólica)',2,'[{\"changed\": {\"fields\": [\"Unidade medida\"]}}]',14,1),(49,'2020-06-13 19:43:01.523870','18','AVE (diastólica)',2,'[{\"changed\": {\"fields\": [\"Unidade medida\"]}}]',14,1),(50,'2020-06-13 19:43:21.243794','18','AVE (diastólica)',2,'[]',14,1),(51,'2020-06-13 19:45:32.441999','16','ACEE (diastólica)',2,'[{\"changed\": {\"fields\": [\"Unidade medida\"]}}]',14,1),(52,'2020-06-13 19:53:29.024738','18','AVE (diastólica)',2,'[{\"changed\": {\"fields\": [\"Unidade medida\"]}}]',14,1),(53,'2020-06-13 19:53:41.927976','16','ACEE (diastólica)',2,'[{\"changed\": {\"fields\": [\"Unidade medida\"]}}]',14,1),(54,'2020-06-13 19:54:45.822898','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(55,'2020-06-18 16:48:37.165311','2','Tomografia Computadorizada',1,'[{\"added\": {}}]',8,1),(56,'2020-06-18 16:51:02.327225','2','Tórax',1,'[{\"added\": {}}]',7,1),(57,'2020-06-18 19:46:38.712483','2','tejlasfkjlasçfj',3,'',10,1),(58,'2020-06-18 19:46:44.123533','3','fsfa',3,'',10,1),(59,'2020-06-18 19:46:47.430366','4','sf',3,'',10,1),(60,'2020-06-18 19:51:24.674963','5','Consolidação',1,'[{\"added\": {}}]',13,1),(61,'2020-06-18 21:32:55.564145','2','arthur',3,'',4,1),(62,'2020-06-18 21:32:55.588320','3','teste',3,'',4,1),(63,'2020-06-18 23:04:41.592692','1','US de Carótidas',2,'[{\"changed\": {\"fields\": [\"Usuario\"]}}]',10,1),(64,'2020-07-09 19:08:44.866208','25','tesoura',3,'',14,1),(65,'2020-07-09 19:08:44.879918','24','pedra',3,'',14,1),(66,'2020-07-09 19:08:44.881299','23','pedra|tesoura',3,'',14,1),(67,'2020-07-09 19:08:44.882440','22','dir|esq',3,'',14,1),(68,'2020-07-09 19:08:44.883784','21','direita|esquerda',3,'',14,1),(69,'2020-07-09 19:08:44.884870','20','ACEEs * ACEEd',3,'',14,1),(70,'2020-07-09 19:08:44.885888','19','teste|testinho',3,'',14,1),(71,'2020-07-09 19:08:44.886946','18','AVEd',3,'',14,1),(72,'2020-07-09 19:08:44.888150','17','AVEs',3,'',14,1),(73,'2020-07-09 19:08:44.889609','16','ACEEd',3,'',14,1),(74,'2020-07-09 19:08:44.891186','15','ACEEs',3,'',14,1),(75,'2020-07-09 19:08:44.892215','14','ACIEd',3,'',14,1),(76,'2020-07-09 19:08:44.893210','13','ACIEs',3,'',14,1),(77,'2020-07-09 19:08:44.894481','12','ACCEd',3,'',14,1),(78,'2020-07-09 19:08:44.895438','11','ACCEs',3,'',14,1),(79,'2020-07-09 19:08:44.896415','10','AVDd',3,'',14,1),(80,'2020-07-09 19:08:44.897390','9','AVDs',3,'',14,1),(81,'2020-07-09 19:08:44.898399','8','ACEDd',3,'',14,1),(82,'2020-07-09 19:08:44.899592','7','ACEDs',3,'',14,1),(83,'2020-07-09 19:08:44.900588','6','ACIDd',3,'',14,1),(84,'2020-07-09 19:08:44.901584','5','ACIDs',3,'',14,1),(85,'2020-07-09 19:08:44.902594','4','ACCDd',3,'',14,1),(86,'2020-07-09 19:08:44.903605','3','ACCDs',3,'',14,1),(87,'2020-07-09 19:08:44.904697','2','intima_esquerda',3,'',14,1),(88,'2020-07-09 19:08:44.905633','1','intima_direita',3,'',14,1),(89,'2020-07-09 19:08:58.256119','6','Vertebrais US',3,'',10,1),(90,'2020-07-09 19:08:58.328613','5','TC de Tórax S/C',3,'',10,1),(91,'2020-07-09 19:08:58.330786','1','US de Carótidas',3,'',10,1),(92,'2020-07-09 19:09:35.434443','3','Abdome',1,'[{\"added\": {}}]',7,1),(93,'2020-07-09 19:10:16.339448','4','teste',3,'',4,1),(94,'2020-07-09 19:14:10.182657','5','arthur',3,'',4,1),(95,'2020-07-09 19:33:00.877563','7','TC de Abdome S/C',2,'[{\"changed\": {\"fields\": [\"Titulo\"]}}]',10,1),(96,'2020-07-09 19:40:34.549430','27','Esteatose hepática',2,'[{\"changed\": {\"fields\": [\"Descricao\", \"Relatorio\", \"Conclusao\"]}}]',13,1),(97,'2020-07-10 23:11:34.835088','44','lmfs}',3,'',14,1),(98,'2020-07-10 23:11:34.837253','43','kdffffdh',3,'',14,1),(99,'2020-07-10 23:11:34.839318','42','{j',3,'',14,1),(100,'2020-07-10 23:11:34.841335','41','j|kdffffdh|lmfs',3,'',14,1),(101,'2020-07-10 23:11:34.843433','40','affffcentuada',3,'',14,1),(102,'2020-07-10 23:11:34.846350','39','moffderada',3,'',14,1),(103,'2020-07-10 23:11:34.848585','38','levffe|moffderada|affffcentuada',3,'',14,1),(104,'2020-07-10 23:11:34.850631','37','acffentuada',3,'',14,1),(105,'2020-07-10 23:11:34.852711','36','modfferada',3,'',14,1),(106,'2020-07-10 23:11:34.854787','35','levffe',3,'',14,1),(107,'2020-07-10 23:11:34.857065','34','levffe|modfferada|acffentuada',3,'',14,1),(108,'2020-07-10 23:11:34.859233','33','afcentuada',3,'',14,1),(109,'2020-07-10 23:11:34.861992','32','moderadafd',3,'',14,1),(110,'2020-07-10 23:11:34.863803','31','levfdfe',3,'',14,1),(111,'2020-07-10 23:11:34.865925','30','levfdfe|moderadafd|afcentuada',3,'',14,1),(112,'2020-07-10 23:11:34.868030','29','III',3,'',14,1),(113,'2020-07-10 23:11:34.870178','28','II',3,'',14,1),(114,'2020-07-10 23:11:34.872307','27','I',3,'',14,1),(115,'2020-07-10 23:11:34.874385','26','I|II|III',3,'',14,1),(116,'2020-07-10 23:12:04.108642','38','asdfsa',3,'',13,1),(117,'2020-07-10 23:12:04.110639','37','asfds',3,'',13,1),(118,'2020-07-10 23:12:04.112732','36','sdfas',3,'',13,1),(119,'2020-07-10 23:12:04.115408','35','fdsa',3,'',13,1),(120,'2020-07-10 23:12:04.117359','34','sdfas',3,'',13,1),(121,'2020-07-10 23:12:04.119394','33','fsdfds',3,'',13,1),(122,'2020-07-10 23:12:04.121555','32','sdff',3,'',13,1),(123,'2020-07-10 23:12:04.123442','31','asfd',3,'',13,1),(124,'2020-07-10 23:12:04.124470','30','safdsf',3,'',13,1),(125,'2020-07-10 23:12:04.126645','29','asdfsaf',3,'',13,1),(126,'2020-07-10 23:12:04.128691','28','fadsaf',3,'',13,1),(127,'2020-07-10 23:12:04.130950','27','Esteatose hepática',3,'',13,1),(128,'2020-07-10 23:29:36.165137','41','Espondiloartrose',3,'',13,1),(129,'2020-07-11 18:55:42.783678','89','multipla',3,'',14,1),(130,'2020-07-11 18:55:42.785565','88','eslcerose',3,'',14,1),(131,'2020-07-11 18:55:42.787642','87','eslcerose|multipla',3,'',14,1),(132,'2020-07-11 18:55:42.789567','86','batata|nascendo',3,'',14,1),(133,'2020-07-11 18:55:42.791918','85','juzinh|caju',3,'',14,1),(134,'2020-07-11 18:55:42.794496','84','livro|legal',3,'',14,1),(135,'2020-07-11 18:55:42.796521','83','lskfj;asdfjl;sadfjslkjf|lsdjflksdjflsjf',3,'',14,1),(136,'2020-07-11 18:55:42.798458','82','ratao|viadao',3,'',14,1),(137,'2020-07-11 18:55:42.800376','81','ratospro|yourisr',3,'',14,1),(138,'2020-07-11 18:55:42.802634','80','guento|mais',3,'',14,1),(139,'2020-07-11 18:55:42.804523','79','bosta|velha',3,'',14,1),(140,'2020-07-11 18:55:42.806860','78','branca|neve',3,'',14,1),(141,'2020-07-11 18:55:42.809168','77','copinho|azul',3,'',14,1),(142,'2020-07-11 18:55:42.811316','76','java|sonsole',3,'',14,1),(143,'2020-07-11 18:55:42.813734','75','eita|giovana',3,'',14,1),(144,'2020-07-11 18:55:42.816068','74','ooooo',3,'',14,1),(145,'2020-07-11 18:55:42.818606','73','iiiii',3,'',14,1),(146,'2020-07-11 18:55:42.820994','72','iiiii|ooooo',3,'',14,1),(147,'2020-07-11 18:55:42.823514','71','rosa',3,'',14,1),(148,'2020-07-11 18:55:42.825696','70','boto',3,'',14,1),(149,'2020-07-11 18:55:42.827934','69','boto|rosa',3,'',14,1),(150,'2020-07-11 18:55:42.830077','68','lmfs}',3,'',14,1),(151,'2020-07-11 18:55:42.832852','67','d',3,'',14,1),(152,'2020-07-11 18:55:42.835252','66','{',3,'',14,1),(153,'2020-07-11 18:55:42.837334','65','j|d|lmfs',3,'',14,1),(154,'2020-07-11 18:55:42.839778','64','yy',3,'',14,1),(155,'2020-07-11 18:55:42.842282','63','tt',3,'',14,1),(156,'2020-07-11 18:55:42.844776','62','tt|yy',3,'',14,1),(157,'2020-07-11 18:55:42.847118','61','nao|da',3,'',14,1),(158,'2020-07-11 18:55:42.849417','60','tes|sfljsdlf|sdfdsf',3,'',14,1),(159,'2020-07-11 18:55:42.851374','59','tttt|dddd',3,'',14,1),(160,'2020-07-11 18:55:42.853693','58','aaa|bbb|cccc|',3,'',14,1),(161,'2020-07-11 18:55:42.855749','57','lmfs',3,'',14,1),(162,'2020-07-11 18:55:42.858259','56','kdfdh',3,'',14,1),(163,'2020-07-11 18:55:42.860804','55','j',3,'',14,1),(164,'2020-07-11 18:55:42.862936','54','j|kdfdh|lmfs',3,'',14,1),(165,'2020-07-11 18:55:42.865048','53','acen',3,'',14,1),(166,'2020-07-11 18:55:42.867138','52','mod',3,'',14,1),(167,'2020-07-11 18:55:42.869215','51','lev',3,'',14,1),(168,'2020-07-11 18:55:42.871390','50','lev|mod|acen',3,'',14,1),(169,'2020-07-11 18:55:42.873581','49','calibre',3,'',14,1),(170,'2020-07-11 18:55:42.875741','48','acentuada',3,'',14,1),(171,'2020-07-11 18:55:42.877769','47','moderada',3,'',14,1),(172,'2020-07-11 18:55:42.879748','46','leve',3,'',14,1),(173,'2020-07-11 18:55:42.882051','45','leve|moderada|acentuada',3,'',14,1),(174,'2020-07-11 18:56:06.640433','31','zzz',3,'',10,1),(175,'2020-07-11 18:56:06.642679','30','nao guento mais',3,'',10,1),(176,'2020-07-11 18:56:06.645352','29','bostinha',3,'',10,1),(177,'2020-07-11 18:56:06.647569','28','fds',3,'',10,1),(178,'2020-07-11 18:56:06.649632','27','copinho',3,'',10,1),(179,'2020-07-11 18:56:06.651688','26','fds',3,'',10,1),(180,'2020-07-11 18:56:06.653889','25','sfds',3,'',10,1),(181,'2020-07-11 18:56:06.655925','24','',3,'',10,1),(182,'2020-07-11 18:56:06.657984','23','',3,'',10,1),(183,'2020-07-11 18:56:06.660452','22','paiaçinn',3,'',10,1),(184,'2020-07-11 18:56:06.663128','21','bbbbbb',3,'',10,1),(185,'2020-07-11 18:56:06.665330','20','bbbbbb',3,'',10,1),(186,'2020-07-11 18:56:06.667486','19','asfdasf',3,'',10,1),(187,'2020-07-11 18:56:06.669706','18','dsf',3,'',10,1),(188,'2020-07-11 18:56:06.671782','17','sfdf',3,'',10,1),(189,'2020-07-11 18:56:06.673825','16','asfdsa',3,'',10,1),(190,'2020-07-11 18:56:06.676029','15','fsdf',3,'',10,1),(191,'2020-07-11 18:56:06.678655','14','dfaf',3,'',10,1),(192,'2020-07-11 18:56:06.680742','13','',3,'',10,1),(193,'2020-07-11 18:56:06.682814','12','',3,'',10,1),(194,'2020-07-11 18:56:06.684942','11','',3,'',10,1),(195,'2020-07-11 18:56:06.687330','10','asfdsa',3,'',10,1),(196,'2020-07-11 18:56:06.689707','9','asfdsa',3,'',10,1),(197,'2020-07-11 18:56:06.692034','8','safas',3,'',10,1),(198,'2020-07-11 18:56:06.694596','7','TC de Abdome S/C',3,'',10,1),(199,'2020-07-14 02:10:58.801755','340','tebbbbste',3,'',14,1),(200,'2020-07-14 02:10:58.804272','339','subbbper',3,'',14,1),(201,'2020-07-14 02:10:58.807657','338','jbbb',3,'',14,1),(202,'2020-07-14 02:10:58.809808','337','jbbb|subbbper|tebbbbste',3,'',14,1),(203,'2020-07-14 02:10:58.813191','336','a5centuada',3,'',14,1),(204,'2020-07-14 02:10:58.815642','335','moder45ada',3,'',14,1),(205,'2020-07-14 02:10:58.817853','334','lev3ee',3,'',14,1),(206,'2020-07-14 02:10:58.819990','333','lev3ee|moder45ada|a5centuada',3,'',14,1),(207,'2020-07-14 02:10:58.822341','332','tebbbbste',3,'',14,1),(208,'2020-07-14 02:10:58.824498','331','subbbper',3,'',14,1),(209,'2020-07-14 02:10:58.826726','330','jbbb',3,'',14,1),(210,'2020-07-14 02:10:58.828777','329','jbbb|subbbper|tebbbbste',3,'',14,1),(211,'2020-07-14 02:10:58.830893','328','a5centuada',3,'',14,1),(212,'2020-07-14 02:10:58.833113','327','moder45ada',3,'',14,1),(213,'2020-07-14 02:10:58.835433','326','lev3ee',3,'',14,1),(214,'2020-07-14 02:10:58.837703','325','lev3ee|moder45ada|a5centuada',3,'',14,1),(215,'2020-07-14 02:10:58.840038','324','a5centuada',3,'',14,1),(216,'2020-07-14 02:10:58.842090','323','moder45ada',3,'',14,1),(217,'2020-07-14 02:10:58.844122','322','lev3ee',3,'',14,1),(218,'2020-07-14 02:10:58.846566','321','lev3ee|moder45ada|a5centuada',3,'',14,1),(219,'2020-07-14 02:10:58.848876','320','a5centuada',3,'',14,1),(220,'2020-07-14 02:10:58.851247','319','moder45ada',3,'',14,1),(221,'2020-07-14 02:10:58.853641','318','lev3ee',3,'',14,1),(222,'2020-07-14 02:10:58.856100','317','lev3ee|moder45ada|a5centuada',3,'',14,1),(223,'2020-07-14 02:10:58.858565','316','y6',3,'',14,1),(224,'2020-07-14 02:10:58.860565','315','utu7',3,'',14,1),(225,'2020-07-14 02:10:58.862576','314','yu7',3,'',14,1),(226,'2020-07-14 02:10:58.864761','313','yu7|utu7|y6',3,'',14,1),(227,'2020-07-14 02:10:58.866845','312','qqqqqq',3,'',14,1),(228,'2020-07-14 02:10:58.868896','311','wwww',3,'',14,1),(229,'2020-07-14 02:10:58.871395','310','jjjj',3,'',14,1),(230,'2020-07-14 02:10:58.873582','309','jjjj|wwww|qqqqqq',3,'',14,1),(231,'2020-07-14 02:10:58.875752','308','lentuada',3,'',14,1),(232,'2020-07-14 02:10:58.877836','307','ccccccd',3,'',14,1),(233,'2020-07-14 02:10:58.879846','306','hhh',3,'',14,1),(234,'2020-07-14 02:10:58.882014','305','hhh|gggg|ccccccd',3,'',14,1),(235,'2020-07-14 02:10:58.884500','304','ppppp',3,'',14,1),(236,'2020-07-14 02:10:58.886893','303','mmmmm',3,'',14,1),(237,'2020-07-14 02:10:58.889432','302','nnnnn',3,'',14,1),(238,'2020-07-14 02:10:58.891510','301','nnnnn|mmmmm|ppppp',3,'',14,1),(239,'2020-07-14 02:10:58.893537','300','xxxxx',3,'',14,1),(240,'2020-07-14 02:10:58.895564','299','bbbbbb',3,'',14,1),(241,'2020-07-14 02:10:58.897771','298','vvvv',3,'',14,1),(242,'2020-07-14 02:10:58.899835','297','vvvv|bbbbbb|xxxxx',3,'',14,1),(243,'2020-07-14 02:10:58.901987','296','oooooo',3,'',14,1),(244,'2020-07-14 02:10:58.904399','295','yyyyyy',3,'',14,1),(245,'2020-07-14 02:10:58.906677','294','uuuuuuu',3,'',14,1),(246,'2020-07-14 02:10:58.908776','293','uuuuuuu|yyyyyy|oooooo',3,'',14,1),(247,'2020-07-14 02:10:58.910849','292','acenffftuada',3,'',14,1),(248,'2020-07-14 02:10:58.913039','291','fffff',3,'',14,1),(249,'2020-07-14 02:10:58.915365','290','levffffe',3,'',14,1),(250,'2020-07-14 02:10:58.917803','289','levffffe|fffff|acenffftuada',3,'',14,1),(251,'2020-07-14 02:10:58.920619','288','cerva',3,'',14,1),(252,'2020-07-14 02:10:58.923488','287','cacha',3,'',14,1),(253,'2020-07-14 02:10:58.925678','286','pinga',3,'',14,1),(254,'2020-07-14 02:10:58.927959','285','pinga|cacha|cerva',3,'',14,1),(255,'2020-07-14 02:10:58.930001','284','cccc',3,'',14,1),(256,'2020-07-14 02:10:58.932055','283','homenb',3,'',14,1),(257,'2020-07-14 02:10:58.934296','282','homema',3,'',14,1),(258,'2020-07-14 02:10:58.936594','281','homema|homenb|cccc',3,'',14,1),(259,'2020-07-14 02:10:58.938884','280','doidjerere',3,'',14,1),(260,'2020-07-14 02:10:58.940902','279','assasi',3,'',14,1),(261,'2020-07-14 02:10:58.943009','278','mamol',3,'',14,1),(262,'2020-07-14 02:10:58.945136','277','mamol|assasi|doidjerere',3,'',14,1),(263,'2020-07-14 02:10:58.947292','276','tefste',3,'',14,1),(264,'2020-07-14 02:10:58.949469','275','supfer',3,'',14,1),(265,'2020-07-14 02:10:58.951789','274','fffj',3,'',14,1),(266,'2020-07-14 02:10:58.954844','273','fffj|supfer|tefste',3,'',14,1),(267,'2020-07-14 02:10:58.956768','272','qqqqqqq',3,'',14,1),(268,'2020-07-14 02:10:58.958488','271','ttttt',3,'',14,1),(269,'2020-07-14 02:10:58.960470','270','rrrrr',3,'',14,1),(270,'2020-07-14 02:10:58.962430','269','rrrrr|ttttt|qqqqqqq',3,'',14,1),(271,'2020-07-14 02:10:58.964720','268','afcentuada',3,'',14,1),(272,'2020-07-14 02:10:58.966670','267','moderadfffa',3,'',14,1),(273,'2020-07-14 02:10:58.968706','266','levefff',3,'',14,1),(274,'2020-07-14 02:10:58.970954','265','levefff|moderadfffa|afcentuada',3,'',14,1),(275,'2020-07-14 02:10:58.973163','264','cabulosa',3,'',14,1),(276,'2020-07-14 02:10:58.975394','263','peerera',3,'',14,1),(277,'2020-07-14 02:10:58.977586','262','peerera|cabulosa',3,'',14,1),(278,'2020-07-14 02:10:58.979044','261','variavelzinhaj',3,'',14,1),(279,'2020-07-14 02:10:58.981464','260','medidora',3,'',14,1),(280,'2020-07-14 02:10:58.983387','259','unidade',3,'',14,1),(281,'2020-07-14 02:10:58.985343','258','unidade|medidora',3,'',14,1),(282,'2020-07-14 02:10:58.987839','257','cedo',3,'',14,1),(283,'2020-07-14 02:10:58.989911','256','hoje',3,'',14,1),(284,'2020-07-14 02:10:58.991891','255','hoje|cedo',3,'',14,1),(285,'2020-07-14 02:10:58.993873','254','facentuada',3,'',14,1),(286,'2020-07-14 02:10:58.995804','253','levfffe|moderfffada|facentuada',3,'',14,1),(287,'2020-07-14 02:10:58.997787','252','carretas',3,'',14,1),(288,'2020-07-14 02:10:58.999568','251','porrilhas',3,'',14,1),(289,'2020-07-14 02:10:59.001474','250','porrilhas|carretas',3,'',14,1),(290,'2020-07-14 02:10:59.003734','249','afffffcentuada',3,'',14,1),(291,'2020-07-14 02:10:59.005947','248','moderfffada',3,'',14,1),(292,'2020-07-14 02:10:59.007803','247','levfffe|moderfffada|afffffcentuada',3,'',14,1),(293,'2020-07-14 02:10:59.009771','246','palavras',3,'',14,1),(294,'2020-07-14 02:10:59.011496','245','livreiro',3,'',14,1),(295,'2020-07-14 02:10:59.013740','244','livreiro|palavras',3,'',14,1),(296,'2020-07-14 02:10:59.015944','243','doidinhoss',3,'',14,1),(297,'2020-07-14 02:10:59.017935','242','patopira',3,'',14,1),(298,'2020-07-14 02:10:59.020029','241','patopira|doidinhoss',3,'',14,1),(299,'2020-07-14 02:11:07.049501','240','ta8131',3,'',14,1),(300,'2020-07-14 02:11:07.051524','239','ta7131',3,'',14,1),(301,'2020-07-14 02:11:07.053652','238','ta813',3,'',14,1),(302,'2020-07-14 02:11:07.056068','237','ta713',3,'',14,1),(303,'2020-07-14 02:11:07.058253','236','ta7131|ta8131',3,'',14,1),(304,'2020-07-14 02:11:07.060496','235','ta713|ta813',3,'',14,1),(305,'2020-07-14 02:11:07.062543','234','ta81',3,'',14,1),(306,'2020-07-14 02:11:07.064584','233','ta71',3,'',14,1),(307,'2020-07-14 02:11:07.066617','232','ta71|ta81',3,'',14,1),(308,'2020-07-14 02:11:07.068834','231','ta6',3,'',14,1),(309,'2020-07-14 02:11:07.070947','230','ta5',3,'',14,1),(310,'2020-07-14 02:11:07.073389','229','ta5|ta6',3,'',14,1),(311,'2020-07-14 02:11:07.075488','228','a * b',3,'',14,1),(312,'2020-07-14 02:11:07.077494','227','b',3,'',14,1),(313,'2020-07-14 02:11:07.079564','226','a',3,'',14,1),(314,'2020-07-14 02:11:07.081760','225','var222',3,'',14,1),(315,'2020-07-14 02:11:07.083870','224','var111',3,'',14,1),(316,'2020-07-14 02:11:07.085910','223','var111|var222',3,'',14,1),(317,'2020-07-14 02:11:07.088038','222','var12',3,'',14,1),(318,'2020-07-14 02:11:07.090374','221','var11',3,'',14,1),(319,'2020-07-14 02:11:07.092445','220','var10',3,'',14,1),(320,'2020-07-14 02:11:07.094557','219','calibre',3,'',14,1),(321,'2020-07-14 02:11:07.096608','218','var10|var11|var12',3,'',14,1),(322,'2020-07-14 02:11:07.098839','217','var5',3,'',14,1),(323,'2020-07-14 02:11:07.100889','216','var4',3,'',14,1),(324,'2020-07-14 02:11:07.102898','215','var4|var5',3,'',14,1),(325,'2020-07-14 02:11:07.105331','214','var3',3,'',14,1),(326,'2020-07-14 02:11:07.107277','213','var2',3,'',14,1),(327,'2020-07-14 02:11:07.109706','212','var1',3,'',14,1),(328,'2020-07-14 02:11:07.112072','211','var1|var2|var3',3,'',14,1),(329,'2020-07-14 02:11:07.114440','210','bailoaotaria',3,'',14,1),(330,'2020-07-14 02:11:07.116657','209','bixinhalouca',3,'',14,1),(331,'2020-07-14 02:11:07.118927','208','bixinhalouca|bailoaotaria',3,'',14,1),(332,'2020-07-14 02:11:07.121054','207','otariosss',3,'',14,1),(333,'2020-07-14 02:11:07.123485','206','savemenow',3,'',14,1),(334,'2020-07-14 02:11:07.125640','205','savemenow|otariosss',3,'',14,1),(335,'2020-07-14 02:11:07.127915','204','otariosss',3,'',14,1),(336,'2020-07-14 02:11:07.129881','203','savemenow',3,'',14,1),(337,'2020-07-14 02:11:07.131934','202','savemenow|otariosss',3,'',14,1),(338,'2020-07-14 02:11:07.133947','201','linkinpark',3,'',14,1),(339,'2020-07-14 02:11:07.136013','200','evanecence',3,'',14,1),(340,'2020-07-14 02:11:07.138078','199','evanecence|linkinpark',3,'',14,1),(341,'2020-07-14 02:11:07.140331','198','Jvsdfd',3,'',14,1),(342,'2020-07-14 02:11:07.142479','197','outrinhassss',3,'',14,1),(343,'2020-07-14 02:11:07.144542','196','outrinhassss|Jvsdfd',3,'',14,1),(344,'2020-07-14 02:11:07.146796','195','lfms',3,'',14,1),(345,'2020-07-14 02:11:07.149014','194','kffdfdh',3,'',14,1),(346,'2020-07-14 02:11:07.151043','193','fj',3,'',14,1),(347,'2020-07-14 02:11:07.153283','192','fj|kffdfdh|lfms',3,'',14,1),(348,'2020-07-14 02:11:07.155749','191','lfms',3,'',14,1),(349,'2020-07-14 02:11:07.157817','190','kffdfdh',3,'',14,1),(350,'2020-07-14 02:11:07.159840','189','fj',3,'',14,1),(351,'2020-07-14 02:11:07.161862','188','fj|kffdfdh|lfms',3,'',14,1),(352,'2020-07-14 02:11:07.163926','187','acentuaffda',3,'',14,1),(353,'2020-07-14 02:11:07.165964','186','cudzismo',3,'',14,1),(354,'2020-07-14 02:11:07.168116','185','leddve',3,'',14,1),(355,'2020-07-14 02:11:07.170801','184','leddve|cudzismo|acentuaffda',3,'',14,1),(356,'2020-07-14 02:11:07.173115','183','acentuaffda',3,'',14,1),(357,'2020-07-14 02:11:07.175027','182','cudzismo',3,'',14,1),(358,'2020-07-14 02:11:07.177018','181','leddve',3,'',14,1),(359,'2020-07-14 02:11:07.179025','180','leddve|cudzismo|acentuaffda',3,'',14,1),(360,'2020-07-14 02:11:07.180999','179','acentuaffda',3,'',14,1),(361,'2020-07-14 02:11:07.183009','178','cudzismo',3,'',14,1),(362,'2020-07-14 02:11:07.185002','177','leddve',3,'',14,1),(363,'2020-07-14 02:11:07.186966','176','leddve|cudzismo|acentuaffda',3,'',14,1),(364,'2020-07-14 02:11:07.189474','175','arthur|neto',3,'',14,1),(365,'2020-07-14 02:11:07.191378','174','mmm',3,'',14,1),(366,'2020-07-14 02:11:07.193246','173','llll',3,'',14,1),(367,'2020-07-14 02:11:07.195423','172','kkkk',3,'',14,1),(368,'2020-07-14 02:11:07.197277','171','kkkk|llll|mmm',3,'',14,1),(369,'2020-07-14 02:11:07.199233','170','axc',3,'',14,1),(370,'2020-07-14 02:11:07.201215','169','qq',3,'',14,1),(371,'2020-07-14 02:11:07.203467','168','ceb',3,'',14,1),(372,'2020-07-14 02:11:07.205693','167','ceb|qq|axc',3,'',14,1),(373,'2020-07-14 02:11:07.208112','166','axc',3,'',14,1),(374,'2020-07-14 02:11:07.210068','165','qq',3,'',14,1),(375,'2020-07-14 02:11:07.212043','164','ceb',3,'',14,1),(376,'2020-07-14 02:11:07.214032','163','ceb|qq|axc',3,'',14,1),(377,'2020-07-14 02:11:07.216036','162','bbbbb',3,'',14,1),(378,'2020-07-14 02:11:07.217982','161','aaaaa',3,'',14,1),(379,'2020-07-14 02:11:07.219853','160','eeeeee',3,'',14,1),(380,'2020-07-14 02:11:07.223287','159','acfentuada',3,'',14,1),(381,'2020-07-14 02:11:07.225373','158','mofderada',3,'',14,1),(382,'2020-07-14 02:11:07.227494','157','levfffe',3,'',14,1),(383,'2020-07-14 02:11:07.229047','156','acfentuada',3,'',14,1),(384,'2020-07-14 02:11:07.231442','155','mofderada',3,'',14,1),(385,'2020-07-14 02:11:07.233369','154','levfffe',3,'',14,1),(386,'2020-07-14 02:11:07.235356','153','salgado',3,'',14,1),(387,'2020-07-14 02:11:07.237566','152','mar',3,'',14,1),(388,'2020-07-14 02:11:07.240570','151','lixo',3,'',14,1),(389,'2020-07-14 02:11:07.242523','150','podridao',3,'',14,1),(390,'2020-07-14 02:11:07.244474','149','lixo',3,'',14,1),(391,'2020-07-14 02:11:07.246474','148','podridao',3,'',14,1),(392,'2020-07-14 02:11:07.248443','147','marrons',3,'',14,1),(393,'2020-07-14 02:11:07.250458','146','pubianos',3,'',14,1),(394,'2020-07-14 02:11:07.252450','145','pubianos|marrons',3,'',14,1),(395,'2020-07-14 02:11:07.254760','144','cabelo|branco',3,'',14,1),(396,'2020-07-14 02:11:07.257044','143','branco',3,'',14,1),(397,'2020-07-14 02:11:07.259152','142','cabelo',3,'',14,1),(398,'2020-07-14 02:11:07.261820','141','cabelo|branco',3,'',14,1),(399,'2020-07-14 02:11:13.950250','140','branco',3,'',14,1),(400,'2020-07-14 02:11:13.952356','139','cabelo',3,'',14,1),(401,'2020-07-14 02:11:13.954715','138','cabelo|branco',3,'',14,1),(402,'2020-07-14 02:11:13.957725','137','bbbbbbbb}',3,'',14,1),(403,'2020-07-14 02:11:13.959798','136','{ttt',3,'',14,1),(404,'2020-07-14 02:11:13.961994','135','rrrr',3,'',14,1),(405,'2020-07-14 02:11:13.964099','134','gggg',3,'',14,1),(406,'2020-07-14 02:11:13.966376','133','ttt|bbbbbbbb',3,'',14,1),(407,'2020-07-14 02:11:13.968389','132','gggg|rrrr',3,'',14,1),(408,'2020-07-14 02:11:13.970574','131','rrrr',3,'',14,1),(409,'2020-07-14 02:11:13.972961','130','gggg',3,'',14,1),(410,'2020-07-14 02:11:13.974905','129','gggg|rrrr',3,'',14,1),(411,'2020-07-14 02:11:13.976934','128','rrrr',3,'',14,1),(412,'2020-07-14 02:11:13.979377','127','gggg',3,'',14,1),(413,'2020-07-14 02:11:13.981680','126','gggg|rrrr',3,'',14,1),(414,'2020-07-14 02:11:13.983748','125','testinhosss}',3,'',14,1),(415,'2020-07-14 02:11:13.986144','124','{outrinho',3,'',14,1),(416,'2020-07-14 02:11:13.989262','123','aceffffntuada',3,'',14,1),(417,'2020-07-14 02:11:13.991752','122','modeffrfada',3,'',14,1),(418,'2020-07-14 02:11:13.993704','121','leffve',3,'',14,1),(419,'2020-07-14 02:11:13.995753','120','outrinho|testinhosss',3,'',14,1),(420,'2020-07-14 02:11:13.997949','119','leffve|modeffrfada|aceffffntuada',3,'',14,1),(421,'2020-07-14 02:11:14.000033','118','aceffffntuada',3,'',14,1),(422,'2020-07-14 02:11:14.002080','117','modeffrfada',3,'',14,1),(423,'2020-07-14 02:11:14.004333','116','leffve',3,'',14,1),(424,'2020-07-14 02:11:14.006438','115','leffve|modeffrfada|aceffffntuada',3,'',14,1),(425,'2020-07-14 02:11:14.008015','114','aceffffntuada',3,'',14,1),(426,'2020-07-14 02:11:14.010000','113','modeffrfada',3,'',14,1),(427,'2020-07-14 02:11:14.012079','112','leffve',3,'',14,1),(428,'2020-07-14 02:11:14.014251','111','leffve|modeffrfada|aceffffntuada',3,'',14,1),(429,'2020-07-14 02:11:14.016641','110','acenftuada',3,'',14,1),(430,'2020-07-14 02:11:14.018951','109','cuzisfmo',3,'',14,1),(431,'2020-07-14 02:11:14.021417','108','levfe',3,'',14,1),(432,'2020-07-14 02:11:14.023718','107','levfe|cuzisfmo|acenftuada',3,'',14,1),(433,'2020-07-14 02:11:14.025997','106','fsd',3,'',14,1),(434,'2020-07-14 02:11:14.027993','105','fsdmoderada',3,'',14,1),(435,'2020-07-14 02:11:14.030056','104','levfsde',3,'',14,1),(436,'2020-07-14 02:11:14.032447','103','levfsde|fsdmoderada|fsd',3,'',14,1),(437,'2020-07-14 02:11:14.034764','102','testezinho',3,'',14,1),(438,'2020-07-14 02:11:14.037354','101','outros',3,'',14,1),(439,'2020-07-14 02:11:14.040211','100','outros|testezinho',3,'',14,1),(440,'2020-07-14 02:11:14.042645','99','acentuada',3,'',14,1),(441,'2020-07-14 02:11:14.044895','98','moderada',3,'',14,1),(442,'2020-07-14 02:11:14.047444','97','leve',3,'',14,1),(443,'2020-07-14 02:11:14.049768','96','leve|moderada|acentuada',3,'',14,1),(444,'2020-07-14 02:11:14.052103','95','princesa',3,'',14,1),(445,'2020-07-14 02:11:14.054380','94','minha',3,'',14,1),(446,'2020-07-14 02:11:14.056587','93','minha|princesa',3,'',14,1),(447,'2020-07-14 02:11:14.058071','92','teste',3,'',14,1),(448,'2020-07-14 02:11:14.059620','91','primeiro',3,'',14,1),(449,'2020-07-14 02:11:14.061865','90','primeiro|teste',3,'',14,1),(450,'2020-07-14 02:11:28.344829','69','',3,'',10,1),(451,'2020-07-14 02:11:28.346879','68','aaaaa',3,'',10,1),(452,'2020-07-14 02:11:28.348934','67','',3,'',10,1),(453,'2020-07-14 02:11:28.351016','66','aaaaa',3,'',10,1),(454,'2020-07-14 02:11:28.353108','65','exsr',3,'',10,1),(455,'2020-07-14 02:11:28.355210','64','',3,'',10,1),(456,'2020-07-14 02:11:28.358085','63','bbb',3,'',10,1),(457,'2020-07-14 02:11:28.360236','62','aaaaa',3,'',10,1),(458,'2020-07-14 02:11:28.362616','61','',3,'',10,1),(459,'2020-07-14 02:11:28.364904','60','aaaa',3,'',10,1),(460,'2020-07-14 02:11:28.367360','59','mais teste',3,'',10,1),(461,'2020-07-14 02:11:28.369383','58','segundo teste',3,'',10,1),(462,'2020-07-14 02:11:28.371572','57','mascarateste',3,'',10,1),(463,'2020-07-14 02:11:28.373935','56','',3,'',10,1),(464,'2020-07-14 02:11:28.376009','55','',3,'',10,1),(465,'2020-07-14 02:11:28.377749','54','',3,'',10,1),(466,'2020-07-14 02:11:28.379469','53','',3,'',10,1),(467,'2020-07-14 02:11:28.381365','52','',3,'',10,1),(468,'2020-07-14 02:11:28.383537','51','',3,'',10,1),(469,'2020-07-14 02:11:28.385755','50','',3,'',10,1),(470,'2020-07-14 02:11:28.387815','49','',3,'',10,1),(471,'2020-07-14 02:11:28.389822','48','',3,'',10,1),(472,'2020-07-14 02:11:28.392336','47','',3,'',10,1),(473,'2020-07-14 02:11:28.394518','46','',3,'',10,1),(474,'2020-07-14 02:11:28.396567','45','',3,'',10,1),(475,'2020-07-14 02:11:28.398589','44','',3,'',10,1),(476,'2020-07-14 02:11:28.400696','43','',3,'',10,1),(477,'2020-07-14 02:11:28.402953','42','',3,'',10,1),(478,'2020-07-14 02:11:28.404989','41','asdf',3,'',10,1),(479,'2020-07-14 02:11:28.407450','40','asfd',3,'',10,1),(480,'2020-07-14 02:11:28.409689','39','eeeee',3,'',10,1),(481,'2020-07-14 02:11:28.411734','38','cccc',3,'',10,1),(482,'2020-07-14 02:11:28.413861','37','bbbb',3,'',10,1),(483,'2020-07-14 02:11:28.416172','36','asf',3,'',10,1),(484,'2020-07-14 02:11:28.418576','35','zzzz',3,'',10,1),(485,'2020-07-14 02:11:28.420872','34','asdf',3,'',10,1),(486,'2020-07-14 02:11:28.423288','33','asf',3,'',10,1),(487,'2020-07-14 02:11:28.425561','32','FASDFDSA',3,'',10,1),(488,'2020-07-14 02:36:42.387700','370','eeeee',3,'',14,1),(489,'2020-07-14 02:36:42.389787','369','fff',3,'',14,1),(490,'2020-07-14 02:36:42.391858','368','aaaa',3,'',14,1),(491,'2020-07-14 02:36:42.393876','367','aaaa|fff|eeeee',3,'',14,1),(492,'2020-07-14 02:36:42.396316','366','acesdfsdfntuada',3,'',14,1),(493,'2020-07-14 02:36:42.399119','365','mosdfderadfsdfa',3,'',14,1),(494,'2020-07-14 02:36:42.401226','364','leve|mosdfderadfsdfa|acesdfsdfntuada',3,'',14,1),(495,'2020-07-14 02:36:42.403365','363','naovi',3,'',14,1),(496,'2020-07-14 02:36:42.405480','362','fsfacentuada',3,'',14,1),(497,'2020-07-14 02:36:42.407738','361','mfdoderada',3,'',14,1),(498,'2020-07-14 02:36:42.409946','360','leasdfve|mfdoderada|fsfacentuada',3,'',14,1),(499,'2020-07-14 02:36:42.412498','359','caralho',3,'',14,1),(500,'2020-07-14 02:36:42.415160','358','bucetinha',3,'',14,1),(501,'2020-07-14 02:36:42.417651','357','bucetinha|caralho',3,'',14,1),(502,'2020-07-14 02:36:42.419832','356','34f',3,'',14,1),(503,'2020-07-14 02:36:42.421768','355','modfs5erada',3,'',14,1),(504,'2020-07-14 02:36:42.423722','354','r45',3,'',14,1),(505,'2020-07-14 02:36:42.425756','353','r45|modfs5erada|34f',3,'',14,1),(506,'2020-07-14 02:36:42.428086','352','acentuasdfda',3,'',14,1),(507,'2020-07-14 02:36:42.430421','351','mfsdoderada',3,'',14,1),(508,'2020-07-14 02:36:42.432734','350','leasdfve',3,'',14,1),(509,'2020-07-14 02:36:42.434720','349','leasdfve|mfsdoderada|acentuasdfda',3,'',14,1),(510,'2020-07-14 02:36:42.436972','348','wwww',3,'',14,1),(511,'2020-07-14 02:36:42.439172','347','bbb',3,'',14,1),(512,'2020-07-14 02:36:42.441220','346','ggg',3,'',14,1),(513,'2020-07-14 02:36:42.443604','345','ggg|bbb|wwww',3,'',14,1),(514,'2020-07-14 02:36:42.446404','344','acentuada',3,'',14,1),(515,'2020-07-14 02:36:42.448830','343','moderada',3,'',14,1),(516,'2020-07-14 02:36:42.451207','342','leve',3,'',14,1),(517,'2020-07-14 02:36:42.453470','341','leve|moderada|acentuada',3,'',14,1),(518,'2020-07-14 02:36:55.889918','108','',3,'',11,1),(519,'2020-07-14 02:36:55.891826','107','',3,'',11,1),(520,'2020-07-14 02:36:55.893830','106','',3,'',11,1),(521,'2020-07-14 02:36:55.896108','105','',3,'',11,1),(522,'2020-07-14 02:36:55.899403','104','asfd',3,'',11,1),(523,'2020-07-14 02:36:55.901805','103','asfds',3,'',11,1),(524,'2020-07-14 02:36:55.903861','102','Adrenais',3,'',11,1),(525,'2020-07-14 02:36:55.905916','101','Pancreas',3,'',11,1),(526,'2020-07-14 02:36:55.907959','100','Figado',3,'',11,1),(527,'2020-07-14 02:39:23.909609','76','',3,'',10,1),(528,'2020-07-14 02:39:23.911767','75','ap',3,'',10,1),(529,'2020-07-14 02:39:23.913954','74','',3,'',10,1),(530,'2020-07-14 02:39:23.916039','73','fasfd',3,'',10,1),(531,'2020-07-14 02:39:23.918243','72','fas',3,'',10,1),(532,'2020-07-14 02:39:23.920425','71','fasfd',3,'',10,1),(533,'2020-07-14 02:39:23.922652','70','TC abdome',3,'',10,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'masks','especialidade'),(8,'masks','exame'),(9,'masks','grupodiagnostico'),(10,'masks','mascara'),(13,'masks','topicoanormal'),(12,'masks','topicoanormalbuilder'),(11,'masks','topiconormal'),(14,'masks','variavel'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2020-06-12 04:51:53.957120'),(2,'auth','0001_initial','2020-06-12 04:51:54.834672'),(3,'admin','0001_initial','2020-06-12 04:51:57.043892'),(4,'admin','0002_logentry_remove_auto_add','2020-06-12 04:51:57.522934'),(5,'admin','0003_logentry_add_action_flag_choices','2020-06-12 04:51:57.534909'),(6,'contenttypes','0002_remove_content_type_name','2020-06-12 04:51:57.930253'),(7,'auth','0002_alter_permission_name_max_length','2020-06-12 04:51:58.172101'),(8,'auth','0003_alter_user_email_max_length','2020-06-12 04:51:58.283832'),(9,'auth','0004_alter_user_username_opts','2020-06-12 04:51:58.295584'),(10,'auth','0005_alter_user_last_login_null','2020-06-12 04:51:58.447588'),(11,'auth','0006_require_contenttypes_0002','2020-06-12 04:51:58.449780'),(12,'auth','0007_alter_validators_add_error_messages','2020-06-12 04:51:58.459677'),(13,'auth','0008_alter_user_username_max_length','2020-06-12 04:51:58.584540'),(14,'auth','0009_alter_user_last_name_max_length','2020-06-12 04:51:58.758349'),(15,'auth','0010_alter_group_name_max_length','2020-06-12 04:51:58.940114'),(16,'auth','0011_update_proxy_permissions','2020-06-12 04:51:58.951775'),(17,'masks','0001_initial','2020-06-12 04:51:59.848138'),(18,'sessions','0001_initial','2020-06-12 04:52:01.811426'),(19,'masks','0002_auto_20200612_1719','2020-06-12 17:19:28.835065'),(20,'masks','0003_nomedavariavel','2020-06-13 18:38:20.685995'),(21,'masks','0004_auto_20200613_1839','2020-06-13 18:39:52.836888'),(22,'masks','0005_auto_20200613_1840','2020-06-13 18:41:00.935049'),(23,'masks','0006_mascara_usuario','2020-06-18 23:04:01.843112'),(24,'masks','0007_variavel_usuario','2020-07-09 01:06:01.324238');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('ej1ea5kop8cqdnclnmwk2nlagh6l2zj9','ZTc4YmIwMTc2OGM4NWI2NzFjMzUyNjYwN2Y3M2MzZTU0MTNmYzg1Zjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjMDU1M2I4MDBlYTU2MmI4YzNjN2I1MjMyNzZjMzRiNjVmMjI4ZjkwIn0=','2020-07-02 23:39:53.460165'),('lhio0o9iaq7hiyag3xn63t0tlu86jwuk','M2MyYTcyNjJkMTNjODRjMDRjMTVmZDM3MTcyMGVhYWQzMjA2ZjVkMDp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkZTRlNGExOThjMDFmNDE4MGM5YTFhYmVlZWNmOGI3NjkxOTc1YzZlIn0=','2020-07-28 02:39:48.432848'),('xxclykzhmuy1fneil0uiedqm4mdaqr6g','M2MyYTcyNjJkMTNjODRjMDRjMTVmZDM3MTcyMGVhYWQzMjA2ZjVkMDp7Il9hdXRoX3VzZXJfaWQiOiI2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkZTRlNGExOThjMDFmNDE4MGM5YTFhYmVlZWNmOGI3NjkxOTc1YzZlIn0=','2020-07-23 19:40:46.051758');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_especialidade`
--

DROP TABLE IF EXISTS `masks_especialidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `masks_especialidade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_especialidade`
--

LOCK TABLES `masks_especialidade` WRITE;
/*!40000 ALTER TABLE `masks_especialidade` DISABLE KEYS */;
INSERT INTO `masks_especialidade` VALUES (1,'Vascular'),(2,'Tórax'),(3,'Abdome');
/*!40000 ALTER TABLE `masks_especialidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_exame`
--

DROP TABLE IF EXISTS `masks_exame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `masks_exame` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  `initials` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_exame`
--

LOCK TABLES `masks_exame` WRITE;
/*!40000 ALTER TABLE `masks_exame` DISABLE KEYS */;
INSERT INTO `masks_exame` VALUES (1,'Ultrassom','US'),(2,'Tomografia Computadorizada','TC');
/*!40000 ALTER TABLE `masks_exame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_mascara`
--

DROP TABLE IF EXISTS `masks_mascara`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `masks_mascara` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `tecnica_header` varchar(50) NOT NULL,
  `tecnica` varchar(500) NOT NULL,
  `relatorio_header` varchar(500) NOT NULL,
  `conclusao_header` varchar(50) NOT NULL,
  `conclusao` varchar(100) NOT NULL,
  `especialidade_id` int(11) NOT NULL,
  `exame_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `masks_mascara_especialidade_id_9c60390e_fk_masks_esp` (`especialidade_id`),
  KEY `masks_mascara_exame_id_a24888fb_fk_masks_exame_id` (`exame_id`),
  KEY `masks_mascara_usuario_id_a53b5f1f_fk_auth_user_id` (`usuario_id`),
  CONSTRAINT `masks_mascara_especialidade_id_9c60390e_fk_masks_esp` FOREIGN KEY (`especialidade_id`) REFERENCES `masks_especialidade` (`id`),
  CONSTRAINT `masks_mascara_exame_id_a24888fb_fk_masks_exame_id` FOREIGN KEY (`exame_id`) REFERENCES `masks_exame` (`id`),
  CONSTRAINT `masks_mascara_usuario_id_a53b5f1f_fk_auth_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_mascara`
--

LOCK TABLES `masks_mascara` WRITE;
/*!40000 ALTER TABLE `masks_mascara` DISABLE KEYS */;
/*!40000 ALTER TABLE `masks_mascara` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_topicoanormal`
--

DROP TABLE IF EXISTS `masks_topicoanormal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `masks_topicoanormal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(500) NOT NULL,
  `relatorio` varchar(500) NOT NULL,
  `conclusao` varchar(100) DEFAULT NULL,
  `topico_normal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `masks_topicoanormal_topico_normal_id_34f25f74_fk_masks_top` (`topico_normal_id`),
  CONSTRAINT `masks_topicoanormal_topico_normal_id_34f25f74_fk_masks_top` FOREIGN KEY (`topico_normal_id`) REFERENCES `masks_topiconormal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_topicoanormal`
--

LOCK TABLES `masks_topicoanormal` WRITE;
/*!40000 ALTER TABLE `masks_topicoanormal` DISABLE KEYS */;
/*!40000 ALTER TABLE `masks_topicoanormal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_topicoanormalbuilder`
--

DROP TABLE IF EXISTS `masks_topicoanormalbuilder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `masks_topicoanormalbuilder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_name` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `topico_normal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `masks_topicoanormalb_topico_normal_id_d6181f3b_fk_masks_top` (`topico_normal_id`),
  CONSTRAINT `masks_topicoanormalb_topico_normal_id_d6181f3b_fk_masks_top` FOREIGN KEY (`topico_normal_id`) REFERENCES `masks_topiconormal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_topicoanormalbuilder`
--

LOCK TABLES `masks_topicoanormalbuilder` WRITE;
/*!40000 ALTER TABLE `masks_topicoanormalbuilder` DISABLE KEYS */;
/*!40000 ALTER TABLE `masks_topicoanormalbuilder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_topiconormal`
--

DROP TABLE IF EXISTS `masks_topiconormal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `masks_topiconormal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orgao` varchar(50) NOT NULL,
  `relatorio` longtext NOT NULL,
  `mascara_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `masks_topiconormal_mascara_id_80c9647b_fk_masks_mascara_id` (`mascara_id`),
  CONSTRAINT `masks_topiconormal_mascara_id_80c9647b_fk_masks_mascara_id` FOREIGN KEY (`mascara_id`) REFERENCES `masks_mascara` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_topiconormal`
--

LOCK TABLES `masks_topiconormal` WRITE;
/*!40000 ALTER TABLE `masks_topiconormal` DISABLE KEYS */;
/*!40000 ALTER TABLE `masks_topiconormal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_variavel`
--

DROP TABLE IF EXISTS `masks_variavel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `masks_variavel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_da_variavel` varchar(100) NOT NULL,
  `nome_amigavel` varchar(500) NOT NULL,
  `unidade_medida` varchar(10) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `masks_variavel_usuario_id_b8e19890_fk_auth_user_id` (`usuario_id`),
  CONSTRAINT `masks_variavel_usuario_id_b8e19890_fk_auth_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=371 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_variavel`
--

LOCK TABLES `masks_variavel` WRITE;
/*!40000 ALTER TABLE `masks_variavel` DISABLE KEYS */;
/*!40000 ALTER TABLE `masks_variavel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-13 23:41:01
