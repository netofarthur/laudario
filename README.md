Radiology Report Builder

Tool for radiologists build their report templates, to gain time in reporting.

How to get things up and running after cloning:

1. Create a folder called 'laudario' anywhere on your local machine.
2. cd into that folder.
3. Clone this repository with "git clone https://github.com/netofarthur/laudario ." (with the dot at the end).
3. Create a python virtual enviroment (Python 3 version) in that folder and activate it:
  $ python3 -m venv env
  $ source env/bin/activate
4. Upgrade Pip and download the python packages in 'requirements.txt' to run this project on your local machine (it
might be necessary to install openssl and mysql with Brew no Mac before doing this. $ brew install openssl and/or $ brew install mariadb no Mac will do it. $ export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/opt/openssl/lib/, may be necessary after):
  $ pip install --upgrade pip
  $ pip install -r requirements.txt
5. Install MariaDB on your system (these two resources might help):
 - https://mariadb.com/resources/blog/installing-mariadb-10-1-16-on-mac-os-x-with-homebrew/
 - https://pypi.org/project/mysqlclient/
6. Start the SQL server and setup MariaDB to work with Django:
  $ mysql.server start (for example)
  $ mysql -u root -p
  > CREATE DATABASE laudario CHARACTER SET utf8;
  > CREATE USER laudariousr@localhost IDENTIFIED BY 'piabinha123';
  > GRANT ALL PRIVILEGES ON laudario.* laudariousr@localhost;
  > FLUSH PRIVILEGES;  


