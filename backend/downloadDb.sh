#!/bin/bash

# Variables
#SERVER=isofruit@172.105.82.139
SERVER=isofruit@172.105.79.155
REMOTE_FILE="~/AldruneWiki/db.sqlite3"
LOCAL_FILE="db.sqlite3"

# Use scp to download the file
scp ${SERVER}:${REMOTE_FILE} ${LOCAL_FILE}
