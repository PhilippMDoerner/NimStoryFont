#!/bin/bash
sudo docker container stop test
sudo docker container rm test
sudo docker build -t nsi .
echo "Run new container"
# sudo docker run -it -p 80:80 -p 443:443 -p 8080:8080 --name test nsi
sudo docker run -d -p 80:80 -p 443:443 -p 8080:8080 --name test nsi