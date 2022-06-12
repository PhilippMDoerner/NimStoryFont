#!/bin/bash
sudo docker container stop test
sudo docker container rm test
sudo docker build -t nsi .

echo "Run new container"
sudo docker run -it -p 80:80 -p 443:443 -v /etc/letsencrypt/live/www.aldrune.com:/certificates -v /home/philipp/dev/nimstoryfont/:/database -v /home/philipp/dev/nimstoryfont/media:/imagemedia -v /home/philipp/Music/session_audio_backup:/audiomedia -v /home/philipp/dev/aldrunewikifrontend/dist/frontend:/frontend --name test nsi