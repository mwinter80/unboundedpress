# unboundedpress

Repo for my personal website.

# install ubuntu server 18.04
# https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-server#0
# update
sudo apt update
sudo apt upgrade

# install docker and docker-compose
# https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04
# https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04

# enable ufw and set rules
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# make unboundedpress directory
mkdir unboundedpress
cd unboundedpress

# pull git repo

# change dir name (the git repo is unboundedpress but make it www)
mv ~/unboundedpress/unboundedpress ~/unboundedpress/www

# put in sensitive data in all the *.template files and 
# install everything
docker-compose up -d

# NEXTCLOUD
# update nextcloud since the dbs were initialized to handle 4-byte characters
docker exec -it mariadb mysql -u root -p
use nextcloud;
set global innodb_file_format=Barracuda;
set global innodb_large_prefix=on;
ALTER DATABASE nextcloud CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
exit
docker-compose exec --user www-data nextcloud php occ config:system:set mysql.utf8mb4 --type boolean --value="true"
docker-compose exec --user www-data nextcloud php occ maintenance:repair

# GITEA
# install gitea through the web-interface and create and fill in Administrator Account Settings
# this might make nginx time out, but that should be ok. It is still running scripts server side
# set ROOT_URL in gitea/gitea/app.ini and restart container
ROOT_URL = https://gitea.unboundedpress.org
#  migrate repose from github

# UNBOUNDEDPRESS
# example of restoring the mongodb
# move database backup to unboundedpress/mongodb_backup
docker exec -it mongo bash
mongorestore --host localhost --port 27017 -d unboundedpress -u username -p password --authenticationDatabase admin /backup/db_dump_2019_07_12/unboundedpress
# here is an example of a file upload:
curl -v -u user:pass -X POST -F 'properties={"filename":"filename"}' -F "file=@filepath_here" https://restheart.unboundedpress.org/unboundedpress/scores.files
# TODO: example of mongodb dump
mongodump --host localhost --port 27017 -d unboundedpress -o /backup/db_dump_2020_03_30 -u username -p password --authenticationDatabase admin
# TODO: examples of the nextcloud and gitea dump and restore
# TODO: maybe try to add some kind of caching
# TODO: consider making mongodb a replica set
# TODO: example of restheart file upload

# SERVER MAINTANENCE
# update dynamic dns script and make cron (currently in /etc/cron.hourly/update_dns
#!/bin/bash

curl "https://api.1984.is/1.0/freedns/?apikey={{{KEY}}}&domain=unboundedpress.org&ip="
curl "https://api.1984.is/1.0/freedns/?apikey={{{KEY}}}&domain=www.unboundedpress.org&ip="
curl "https://api.1984.is/1.0/freedns/?apikey={{{KEY}}}&domain=restheart.unboundedpress.org&ip="
curl "https://api.1984.is/1.0/freedns/?apikey={{{KEY}}}&domain=gitea.unboundedpress.org&ip="
curl "https://api.1984.is/1.0/freedns/?apikey={{{KEY}}}&domain=nextcloud.unboundedpress.org&ip="
curl "https://api.1984.is/1.0/freedns/?apikey={{{KEY}}}&domain=dev.unboundedpress.org&ip="
<<<<<<< HEAD
curl "https://api.1984.is/1.0/freedns/?apikey={{{KEY}}}&domain=express.unboundedpress.org&ip="
# Backups are done using rsnapshot (currently in /etc/cron.weekly/backup.sh)
=======
# Backups are done using rsnapshot (currently in /etc/cron.weekly/backup)
>>>>>>> 29c197a67b7278fe73cead0708e8d73fe06f1d11
