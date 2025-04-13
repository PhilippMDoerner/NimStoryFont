#!/bin/bash

# Set the server details
SERVER=isofruit@172.105.82.139
REMOTE_FILE=~/AldruneWiki/db.sqlite3
LOCAL_FILE=db.sqlite3

# Use scp to download the file
scp ${SERVER}:${REMOTE_FILE} ${LOCAL_FILE}
