#!/bin/bash
sudo docker container stop test
sudo docker container rm test
sudo docker build -t nsi_debug .

echo "Run new container"
sudo docker run -it -p 80:80 -p 443:443 \
-v /etc/nginx/certificates:/cert/live/www.aldrune.com:ro \
-v /etc/nginx/certificates:/cert/archive/www.aldrune.com:ro \
-v $HOME/dev/nimstoryfont/:/database \
-v $HOME/dev/nimstoryfont/media:/imagemedia \
-v $HOME/Music/session_audio_backup:/audiomedia \
-v $HOME/Music/session_audio_backup/extended:/audiomedia/extended \
-v $HOME/dev/aldrunewikifrontend/dist/frontend:/frontend \
-v /tmp:/var/log/nginx --name test nsi_debug