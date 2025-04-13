#!/bin/bash

# Set the server details
#SERVER=isofruit@172.105.82.139
SERVER=isofruit@172.105.79.155
REMOTE_DIR=~/cronjob_scripts
LOCAL_DIR=~/dev/nimstoryfont/backend/buildFiles/nimstoryfont/jobs

# Use scp to upload the directory
scp -r ${LOCAL_DIR} ${SERVER}:${REMOTE_DIR}
