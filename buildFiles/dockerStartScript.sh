#!/bin/bash
# This file contains all commands that shall be run on the docker container on startup
# openrc is there to allow rc-service to run. rc-service manages the nginx server and starts it
# nimstoryfont is the name of the binary that is the webapplication
openrc boot
rc-service nginx start
/nimstoryfont