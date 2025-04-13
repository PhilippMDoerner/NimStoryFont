#!/bin/sh

# Variables
#SERVER=isofruit@172.105.82.139
SERVER=isofruit@172.105.79.155
FRONTEND_DIR=~/frontend

rm ./dist.zip
zip -r dist.zip -9 ./dist
scp ./dist.zip ${SERVER}:${FRONTEND_DIR}
ssh ${SERVER} "rm -rf ${FRONTEND_DIR}/dist"
ssh ${SERVER} "unzip ${FRONTEND_DIR}/dist.zip -d ${FRONTEND_DIR}"
ssh -t ${SERVER} "sudo docker-compose restart"