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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add especialidade',7,'add_especialidade'),(26,'Can change especialidade',7,'change_especialidade'),(27,'Can delete especialidade',7,'delete_especialidade'),(28,'Can view especialidade',7,'view_especialidade'),(29,'Can add exame',8,'add_exame'),(30,'Can change exame',8,'change_exame'),(31,'Can delete exame',8,'delete_exame'),(32,'Can view exame',8,'view_exame'),(33,'Can add grupo diagnostico',9,'add_grupodiagnostico'),(34,'Can change grupo diagnostico',9,'change_grupodiagnostico'),(35,'Can delete grupo diagnostico',9,'delete_grupodiagnostico'),(36,'Can view grupo diagnostico',9,'view_grupodiagnostico'),(37,'Can add mascara',10,'add_mascara'),(38,'Can change mascara',10,'change_mascara'),(39,'Can delete mascara',10,'delete_mascara'),(40,'Can view mascara',10,'view_mascara'),(41,'Can add topico normal',11,'add_topiconormal'),(42,'Can change topico normal',11,'change_topiconormal'),(43,'Can delete topico normal',11,'delete_topiconormal'),(44,'Can view topico normal',11,'view_topiconormal'),(45,'Can add topico anormal builder',12,'add_topicoanormalbuilder'),(46,'Can change topico anormal builder',12,'change_topicoanormalbuilder'),(47,'Can delete topico anormal builder',12,'delete_topicoanormalbuilder'),(48,'Can view topico anormal builder',12,'view_topicoanormalbuilder'),(49,'Can add topico anormal',13,'add_topicoanormal'),(50,'Can change topico anormal',13,'change_topicoanormal'),(51,'Can delete topico anormal',13,'delete_topicoanormal'),(52,'Can view topico anormal',13,'view_topicoanormal');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$180000$sU9sqaSaQPgC$ukXJOxMu1nLR3d5n3SBFKmAWDmlCTFgGVx0BC5vwrpU=','2020-06-12 15:52:26.301125',1,'admin','','','admin@localhost',1,1,'2020-06-12 04:52:40.450342');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2020-06-12 15:52:51.056722','1','Vascular',1,'[{\"added\": {}}]',7,1),(2,'2020-06-12 15:53:03.110575','1','Ultrassom',1,'[{\"added\": {}}]',8,1),(3,'2020-06-12 15:53:40.642837','1','Geral',1,'[{\"added\": {}}]',9,1),(4,'2020-06-12 15:54:17.706529','1','Não classificados',2,'[{\"changed\": {\"fields\": [\"Nome\"]}}]',9,1),(5,'2020-06-12 15:56:46.827408','1','US de Carótidas',1,'[{\"added\": {}}]',10,1),(6,'2020-06-12 15:59:09.233854','1','Carótidas',1,'[{\"added\": {}}]',11,1),(7,'2020-06-12 16:00:00.159886','2','Artérias vertebrais',1,'[{\"added\": {}}]',11,1),(8,'2020-06-12 16:03:43.784988','3','Medidas dos complexos medio-intimais',1,'[{\"added\": {}}]',11,1),(9,'2020-06-12 16:09:06.812219','4','Picos de velocidades sistólica e diastólica',1,'[{\"added\": {}}]',11,1),(10,'2020-06-12 16:12:41.270277','1','Placas Bulbos (sem repercussão hemodinâmica)',1,'[{\"added\": {}}]',13,1),(11,'2020-06-12 16:14:52.324615','2','Fluxo reverso (vertebral direita)',1,'[{\"added\": {}}]',13,1),(12,'2020-06-12 16:15:55.530818','3','Fluxo reverso (vertebral esquerda)',1,'[{\"added\": {}}]',13,1),(13,'2020-06-12 16:18:00.656187','4','Espessamento medio-intimal das carótidas',1,'[{\"added\": {}}]',13,1),(14,'2020-06-12 16:19:18.255328','1','Estenose de carótidas (SRU)',1,'[{\"added\": {}}]',12,1),(15,'2020-06-12 16:23:16.791733','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(16,'2020-06-12 16:23:38.938657','3','Medidas dos complexos medio-intimais',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(17,'2020-06-12 16:24:28.053277','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(18,'2020-06-12 16:25:00.324975','3','Medidas dos complexos medio-intimais',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(19,'2020-06-12 16:27:10.525737','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1),(20,'2020-06-12 16:59:20.510453','4','Picos de velocidades sistólica e diastólica',2,'[{\"changed\": {\"fields\": [\"Relatorio\"]}}]',11,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'masks','especialidade'),(8,'masks','exame'),(9,'masks','grupodiagnostico'),(10,'masks','mascara'),(13,'masks','topicoanormal'),(12,'masks','topicoanormalbuilder'),(11,'masks','topiconormal'),(6,'sessions','session');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2020-06-12 04:51:53.957120'),(2,'auth','0001_initial','2020-06-12 04:51:54.834672'),(3,'admin','0001_initial','2020-06-12 04:51:57.043892'),(4,'admin','0002_logentry_remove_auto_add','2020-06-12 04:51:57.522934'),(5,'admin','0003_logentry_add_action_flag_choices','2020-06-12 04:51:57.534909'),(6,'contenttypes','0002_remove_content_type_name','2020-06-12 04:51:57.930253'),(7,'auth','0002_alter_permission_name_max_length','2020-06-12 04:51:58.172101'),(8,'auth','0003_alter_user_email_max_length','2020-06-12 04:51:58.283832'),(9,'auth','0004_alter_user_username_opts','2020-06-12 04:51:58.295584'),(10,'auth','0005_alter_user_last_login_null','2020-06-12 04:51:58.447588'),(11,'auth','0006_require_contenttypes_0002','2020-06-12 04:51:58.449780'),(12,'auth','0007_alter_validators_add_error_messages','2020-06-12 04:51:58.459677'),(13,'auth','0008_alter_user_username_max_length','2020-06-12 04:51:58.584540'),(14,'auth','0009_alter_user_last_name_max_length','2020-06-12 04:51:58.758349'),(15,'auth','0010_alter_group_name_max_length','2020-06-12 04:51:58.940114'),(16,'auth','0011_update_proxy_permissions','2020-06-12 04:51:58.951775'),(17,'masks','0001_initial','2020-06-12 04:51:59.848138'),(18,'sessions','0001_initial','2020-06-12 04:52:01.811426'),(19,'masks','0002_auto_20200612_1719','2020-06-12 17:19:28.835065');
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
INSERT INTO `django_session` VALUES ('3bg576ilkawcir97ad59v03rn0y2iqzi','ZTc4YmIwMTc2OGM4NWI2NzFjMzUyNjYwN2Y3M2MzZTU0MTNmYzg1Zjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjMDU1M2I4MDBlYTU2MmI4YzNjN2I1MjMyNzZjMzRiNjVmMjI4ZjkwIn0=','2020-06-26 04:55:44.404605'),('k22dyiipezj9gfa7elj5hqkckgsy7le3','ZTc4YmIwMTc2OGM4NWI2NzFjMzUyNjYwN2Y3M2MzZTU0MTNmYzg1Zjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjMDU1M2I4MDBlYTU2MmI4YzNjN2I1MjMyNzZjMzRiNjVmMjI4ZjkwIn0=','2020-06-26 15:52:26.304152');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_especialidade`
--

LOCK TABLES `masks_especialidade` WRITE;
/*!40000 ALTER TABLE `masks_especialidade` DISABLE KEYS */;
INSERT INTO `masks_especialidade` VALUES (1,'Vascular');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_exame`
--

LOCK TABLES `masks_exame` WRITE;
/*!40000 ALTER TABLE `masks_exame` DISABLE KEYS */;
INSERT INTO `masks_exame` VALUES (1,'Ultrassom','US');
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
  PRIMARY KEY (`id`),
  KEY `masks_mascara_especialidade_id_9c60390e_fk_masks_esp` (`especialidade_id`),
  KEY `masks_mascara_exame_id_a24888fb_fk_masks_exame_id` (`exame_id`),
  CONSTRAINT `masks_mascara_especialidade_id_9c60390e_fk_masks_esp` FOREIGN KEY (`especialidade_id`) REFERENCES `masks_especialidade` (`id`),
  CONSTRAINT `masks_mascara_exame_id_a24888fb_fk_masks_exame_id` FOREIGN KEY (`exame_id`) REFERENCES `masks_exame` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_mascara`
--

LOCK TABLES `masks_mascara` WRITE;
/*!40000 ALTER TABLE `masks_mascara` DISABLE KEYS */;
INSERT INTO `masks_mascara` VALUES (1,'US de Carótidas','Ultrassom de Carótidas','Técnica','Realizado varredura das artérias carótidas e vertebrais com transdutor linear de alta frequência.','Relatório','Conclusão','Ultrassom arterial com Doppler das carótidas e vertebrais sem alterações significativas ao método.',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_topicoanormal`
--

LOCK TABLES `masks_topicoanormal` WRITE;
/*!40000 ALTER TABLE `masks_topicoanormal` DISABLE KEYS */;
INSERT INTO `masks_topicoanormal` VALUES (1,'Placas Bulbos (sem repercussão hemodinâmica)','Placas Bulbos (sem repercussão hemodinâmica)','Placas ateromatosas nos bulbos carotídeos bilateralmente, sem determinar estenose significativa ao modo B.','Placas ateromatosas nos bulbos carotídeos, sem repercussão hemodinâmica significativa.',1),(2,'Fluxo reverso (vertebral direita)','Fluxo reverso na artéria vertebral direita.','Presença de fluxo retrógrado na artéria vertebral direita.','Fluxo retrógrada na artéria vertebral direita (síndrome do roubo de subclávia?).',2),(3,'Fluxo reverso (vertebral esquerda)','Fluxo reverso na artéria vertebral esquerda..','Presença de fluxo retrógrado na artéria vertebral esquerda..','Fluxo retrógrada na artéria vertebral esquerda (síndrome do roubo de subclávia?).',2),(4,'Espessamento medio-intimal das carótidas','Espessamento medio-intimal, sem placas.','Espessamento medio-intimal nas artérias carótidas comuns, sem evidências de placas ateromatosas.','Espessamento medio-intimal bilateral.',1);
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
INSERT INTO `masks_topicoanormalbuilder` VALUES (1,'estenose_carotidas_sru.html','Estenose de carótidas (SRU)',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_topiconormal`
--

LOCK TABLES `masks_topiconormal` WRITE;
/*!40000 ALTER TABLE `masks_topiconormal` DISABLE KEYS */;
INSERT INTO `masks_topiconormal` VALUES (1,'Carótidas','Aspecto ultrassonográfico normal das artérias carótidas comuns e suas bifurcações, tanto no modo B como no Doppler colorido.',1),(2,'Artérias vertebrais','Artérias vertebrais com fluxo cefálico preservado.',1),(3,'Medidas dos complexos medio-intimais','Espessuras dos complexos medio-intimais:\r\nACCD: {intima_direita} mm.\r\nACCE: {intima_esquerda} mm.',1),(4,'Picos de velocidades sistólica e diastólica','Picos de velocidades sistólica / diastólica (cm/s):\r\nACCD: {accd_sistólica} / {accd_diastólica} (cm/s).\r\nACID: {acid_sistólica} / {acid_diastólica} (cm/s).\r\nACED: {aced_sistólica} / {aced_diastólica} (cm/s).\r\nAVD: {avd_sistólica} / {avd_diastólica} (cm/s).\r\n\r\nACCE: {acce_sistólica} / {acce_diastólica} (cm/s).\r\nACIE: {acie_sistólica} / {acie_diastólica} (cm/s).\r\nACEE: {acee_sistólica} / {acee_diastólica} (cm/s).\r\nAVE: {ave_sistólica} / {ave_diastólica} (cm/s).',1);
/*!40000 ALTER TABLE `masks_topiconormal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-12 14:20:38
