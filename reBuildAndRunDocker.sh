#!/bin/bash
sudo docker container stop test
sudo docker container rm test

nimble release

sudo docker build -t nsi .

echo "Run new container"
sudo docker run -it -p 80:80 -p 443:443 -v /etc/letsencrypt/live/www.aldrune.com:/certificates -v $HOME/dev/nimstoryfont/:/database -v $HOME/dev/nimstoryfont/media:/imagemedia -v $HOME/Music/session_audio_backup:/audiomedia -v $HOME/dev/aldrunewikifrontend/dist/frontend:/frontend -v /tmp:/var/log/nginx --name test nsi