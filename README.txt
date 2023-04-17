# unboundedpress

Repo for my personal website.

If you have the keys to my castle, you should be able to archive the entire top level folder, move everything to another server and just deploy with:
docker-compose up -d

But that is being pretty optimistic.

In the docker-compose.yml file, there are detailed notes of non-automatic steps that need to be taken, especially for deploying from scratch.

Here are some useful tips.

The current server is running on ubuntu server 22.04/

# Running on docker. Here are some install tips.
# https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04
# https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-22-04

# There are two .env files that are the same and go at the top level folder and again in portfolio/src. Templates are provided.

# Here are a list of the service
# Main components
porfolio - node server and frontend for my porfilio that uses mongo backend
mongo - houses the data of my portfolio
restheart - api to feed data from mongo to portfolio (though there are some end points built into the node app)
gitea - my code repository
mysql-gitea - databse for gitea
nginx-proxy - reverse proxy for everything
acme-companion - lets encrypt certificate manager

# Extra components
nextcloud
mysql-nextcloud

# Here are some useful tips for mongo
# dump and restore example:
mongodump --host localhost --port 27017 -d unboundedpress -o /backup/db_dump_2023_04_07 -u username -p password --authenticationDatabase admin
mongorestore --host localhost --port 27017 -d portfolio -u username -p password --authenticationDatabase admin /db_backups/db_dump_2023_04_07/unboundedpress
# here is an example of a file upload through restheart:
curl -v -u user:pass -X POST -F 'properties={"filename":"filename"}' -F "file=@filepath_here" https://unboundedpress.org/api/scores.files
