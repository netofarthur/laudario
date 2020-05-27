Radiology Report Builder

Tool for radiologists build their report templates, to gain time in reporting.

How to get things up and running after cloning:

1. Create a python virtual enviroment (Python 3 version) in the folder of the cloned project and activate it:
  $ python3 -m venv env
  $ source env/bin/activate
2. Download the python packages in 'requirements.txt' to run this project on your local machine (it might be necessary to download other required packages for your OS, like openssl and mysql for Mac OS with brew):
  $ pip install --upgrade pip
  $ pip install -r requirements.txt
3. Install MariaDB (other technologies, like MySQL and PostgreSQL should work) on your system (these two resources might help for Mac OS, Debian already comes with it installed):
 - https://mariadb.com/resources/blog/installing-mariadb-10-1-16-on-mac-os-x-with-homebrew/
 - https://pypi.org/project/mysqlclient/
4. Start the SQL server and setup MariaDB (other technologies, like MySQL and PostgreSQL should work) to work with Django:
  $ mysql.server start (for example)
  $ mysql -u root -p
  > CREATE DATABASE laudario CHARACTER SET utf8;
  > CREATE USER laudariousr@localhost IDENTIFIED BY 'piabinha123';
  > GRANT ALL PRIVILEGES ON laudario.* TO laudariousr@localhost;
  > FLUSH PRIVILEGES;
5. In 'backup.sql' the superuser is 'admin' and the password is 'admin'. This file is only for database testing.
