#!/bin/bash
sudo docker container stop test
sudo docker container rm test
sudo docker build -t nsi .
echo "Run new container"
sudo docker run -it -p 80:80 -p 443:443 --name test nsi