#!/bin/bash
sudo docker container stop test
sudo docker container rm test

nimble alpine

sudo docker build -t nsi_prod .

echo "Run new container"
sudo docker run -p 80:80 -p 443:443 \
-v /etc/nginx/certificates:/cert/live/www.aldrune.com:ro \
-v /etc/nginx/certificates:/cert/archive/www.aldrune.com:ro \
-v $HOME/dev/nimstoryfont/:/database \
-v $HOME/dev/nimstoryfont/media:/imagemedia \
-v $HOME/Music/session_audio_backup:/session_audio \
-v $HOME/Music/session_audio_backup/extended:/session_audio/extended \
-v $HOME/dev/aldrunewikifrontend/dist/frontend:/frontend \
-v /tmp:/var/log/nginx \
--name test nsi_prod

