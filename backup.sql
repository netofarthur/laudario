-- MySQL dump 10.13  Distrib 8.0.19, for osx10.15 (x86_64)
--
-- Host: localhost    Database: laudario
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add especialidade',7,'add_especialidade'),(26,'Can change especialidade',7,'change_especialidade'),(27,'Can delete especialidade',7,'delete_especialidade'),(28,'Can view especialidade',7,'view_especialidade'),(29,'Can add exame',8,'add_exame'),(30,'Can change exame',8,'change_exame'),(31,'Can delete exame',8,'delete_exame'),(32,'Can view exame',8,'view_exame'),(33,'Can add mascara',9,'add_mascara'),(34,'Can change mascara',9,'change_mascara'),(35,'Can delete mascara',9,'delete_mascara'),(36,'Can view mascara',9,'view_mascara'),(37,'Can add topico normal',10,'add_topiconormal'),(38,'Can change topico normal',10,'change_topiconormal'),(39,'Can delete topico normal',10,'delete_topiconormal'),(40,'Can view topico normal',10,'view_topiconormal'),(41,'Can add topico anormal',11,'add_topicoanormal'),(42,'Can change topico anormal',11,'change_topicoanormal'),(43,'Can delete topico anormal',11,'delete_topicoanormal'),(44,'Can view topico anormal',11,'view_topicoanormal');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$180000$ptSeb18JIuM4$DV0vBJDfi+rpTBur/jBC2wePDnVZKHRUrteialHEM+g=','2020-06-03 19:24:10.759091',1,'admin','','','admin@localhost.com',1,1,'2020-06-03 19:22:18.379231');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2020-06-03 19:25:16.644425','1','Abdome',1,'[{\"added\": {}}]',7,1),(2,'2020-06-03 19:26:06.383430','1','Ultrassom',1,'[{\"added\": {}}]',8,1),(3,'2020-06-03 19:28:56.561242','1','Ultrassom de Carótidas',1,'[{\"added\": {}}]',9,1),(4,'2020-06-03 19:35:08.249008','1','Artérias carótidas comuns, internas e externas',1,'[{\"added\": {}}]',10,1),(5,'2020-06-03 19:35:56.983159','2','Artérias vertebrais',1,'[{\"added\": {}}]',10,1),(6,'2020-06-03 20:07:09.191313','1','Ultrassom de Carótidas',2,'[{\"changed\": {\"fields\": [\"Conclusao header\"]}}]',9,1),(7,'2020-06-03 21:40:12.577092','1','TopicoAnormal object (1)',1,'[{\"added\": {}}]',11,1),(8,'2020-06-03 21:40:56.522401','1','TopicoAnormal object (1)',2,'[]',11,1),(9,'2020-06-03 21:41:15.217950','1','TopicoAnormal object (1)',2,'[]',11,1),(10,'2020-06-04 01:34:43.627698','1','TopicoAnormal object (1)',2,'[{\"changed\": {\"fields\": [\"Javascript\"]}}]',11,1),(11,'2020-06-04 01:36:08.235633','1','Estenose de Carótidas (SRU)',2,'[{\"changed\": {\"fields\": [\"Javascript\"]}}]',11,1),(12,'2020-06-04 05:51:21.027745','1','Estenose de Carótidas (SRU)',2,'[{\"changed\": {\"fields\": [\"Template name\"]}}]',11,1),(13,'2020-06-04 06:34:04.009361','2','Estenose de Carótidas (SSS)',1,'[{\"added\": {}}]',11,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'masks','especialidade'),(8,'masks','exame'),(9,'masks','mascara'),(11,'masks','topicoanormal'),(10,'masks','topiconormal'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2020-06-03 19:21:43.480619'),(2,'auth','0001_initial','2020-06-03 19:21:44.358662'),(3,'admin','0001_initial','2020-06-03 19:21:46.492848'),(4,'admin','0002_logentry_remove_auto_add','2020-06-03 19:21:46.873467'),(5,'admin','0003_logentry_add_action_flag_choices','2020-06-03 19:21:46.883327'),(6,'contenttypes','0002_remove_content_type_name','2020-06-03 19:21:47.144925'),(7,'auth','0002_alter_permission_name_max_length','2020-06-03 19:21:47.398411'),(8,'auth','0003_alter_user_email_max_length','2020-06-03 19:21:47.500084'),(9,'auth','0004_alter_user_username_opts','2020-06-03 19:21:47.512198'),(10,'auth','0005_alter_user_last_login_null','2020-06-03 19:21:47.651178'),(11,'auth','0006_require_contenttypes_0002','2020-06-03 19:21:47.653366'),(12,'auth','0007_alter_validators_add_error_messages','2020-06-03 19:21:47.663175'),(13,'auth','0008_alter_user_username_max_length','2020-06-03 19:21:47.778366'),(14,'auth','0009_alter_user_last_name_max_length','2020-06-03 19:21:47.877887'),(15,'auth','0010_alter_group_name_max_length','2020-06-03 19:21:48.000436'),(16,'auth','0011_update_proxy_permissions','2020-06-03 19:21:48.011667'),(17,'masks','0001_initial','2020-06-03 19:21:48.647483'),(18,'sessions','0001_initial','2020-06-03 19:21:49.673040'),(19,'masks','0002_mascara_conclusao_header','2020-06-03 20:04:58.990694'),(20,'masks','0003_auto_20200603_2129','2020-06-03 21:29:11.520897'),(21,'masks','0004_auto_20200604_0418','2020-06-04 04:19:05.612417');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `django_session` VALUES ('jjkr69dzwponh8u1bujtmfujrfjpw7cb','OWQyYjY3ZDVlOTkyYTJlMzU3NTA5MDNiNjhjMzRiN2YzZTE1Mjk1ZDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwMDgzYzY3NTg0NTFkMDZhNmUwM2Q0Mzk1YjA5NzY4NTMzMDVmOWU5In0=','2020-06-17 19:24:10.761855');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_especialidade`
--

DROP TABLE IF EXISTS `masks_especialidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `masks_especialidade` VALUES (1,'Abdome');
/*!40000 ALTER TABLE `masks_especialidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_exame`
--

DROP TABLE IF EXISTS `masks_exame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masks_mascara` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_name` varchar(100) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `tecnica_header` varchar(50) NOT NULL,
  `tecnica` varchar(500) NOT NULL,
  `relatorio_header` varchar(500) NOT NULL,
  `conclusao` varchar(100) NOT NULL,
  `especialidade_id` int(11) NOT NULL,
  `exame_id` int(11) NOT NULL,
  `conclusao_header` varchar(50) NOT NULL,
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
INSERT INTO `masks_mascara` VALUES (1,'us_carotidas.html','Ultrassom de Carótidas','Ultrassom de Carótidas','Técnica','Realizado varredura com transdutor linear de alta frequência das artérias carótidas e vertebrais.','Relatório','Ultrassom arterial com Doppler de carótidas e vertebrais sem alterações significativas.',1,1,'Conclusão');
/*!40000 ALTER TABLE `masks_mascara` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_topicoanormal`
--

DROP TABLE IF EXISTS `masks_topicoanormal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masks_topicoanormal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `relatorio` varchar(500) NOT NULL,
  `conclusao` varchar(100) NOT NULL,
  `topico_normal_id` int(11) NOT NULL,
  `descricao` varchar(500) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `template_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `masks_topicoanormal_topico_normal_id_34f25f74_fk_masks_top` (`topico_normal_id`),
  CONSTRAINT `masks_topicoanormal_topico_normal_id_34f25f74_fk_masks_top` FOREIGN KEY (`topico_normal_id`) REFERENCES `masks_topiconormal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_topicoanormal`
--

LOCK TABLES `masks_topicoanormal` WRITE;
/*!40000 ALTER TABLE `masks_topicoanormal` DISABLE KEYS */;
INSERT INTO `masks_topicoanormal` VALUES (1,'\'\'','\'\'',1,'Critérios para estratificação de estenose segundo consenso da Society of Radiologists in Ultrasound.','Estenose de Carótidas (SRU)','us_estenose_carotidas_sru.html'),(2,'fasdfsa','afdsf',1,'afsdf','Estenose de Carótidas (SSS)','us_estenose_carotidas_sss.html');
/*!40000 ALTER TABLE `masks_topicoanormal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `masks_topiconormal`
--

DROP TABLE IF EXISTS `masks_topiconormal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masks_topiconormal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orgao` varchar(50) NOT NULL,
  `relatorio` varchar(500) NOT NULL,
  `mascara_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `masks_topiconormal_mascara_id_80c9647b_fk_masks_mascara_id` (`mascara_id`),
  CONSTRAINT `masks_topiconormal_mascara_id_80c9647b_fk_masks_mascara_id` FOREIGN KEY (`mascara_id`) REFERENCES `masks_mascara` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masks_topiconormal`
--

LOCK TABLES `masks_topiconormal` WRITE;
/*!40000 ALTER TABLE `masks_topiconormal` DISABLE KEYS */;
INSERT INTO `masks_topiconormal` VALUES (1,'Artérias carótidas comuns, internas e externas','Aspecto ultrassonográfico normal das artérias carótidas comuns e suas bifurcações e carótidas internas e externas, tanto no modo B como no Doppler colorido.',1),(2,'Artérias vertebrais','Artérias vertebrais com fluxo cefálico preservado.',1);
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

-- Dump completed on 2020-06-04 11:21:35
