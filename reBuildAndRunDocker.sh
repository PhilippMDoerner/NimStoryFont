#!/bin/bash
sudo docker container stop test
sudo docker container rm test

nimble release

sudo docker build -t nsi_prod .
sudo docker save -o image.tar nsi_prod

echo "Run new container"
sudo docker run -it -p 80:80 -p 443:443 -v /etc/nginx/certificates:/certificates -v $HOME/dev/nimstoryfont/:/database -v $HOME/dev/nimstoryfont/media:/imagemedia -v $HOME/Music/session_audio_backup:/audiomedia -v $HOME/Music/session_audio_backup/extended:/audiomedia/extended -v $HOME/dev/aldrunewikifrontend/dist/frontend:/frontend -v /tmp:/var/log/nginx --name test nsi_prod

