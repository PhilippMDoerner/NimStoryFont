#!/bin/bash
sudo docker container stop test
sudo docker container rm test

cp -r /home/philipp/dev/aldrunewikifrontend/dist .

sudo docker build -t nsi .

rm -r /home/philipp/dev/nimstoryfont/dist

echo "Run new container"
sudo docker run -it -p 80:80 -p 443:443 -v /etc/letsencrypt/live/www.aldrune.com:/certificates -v /home/philipp/dev/nimstoryfont/:/database -v /home/philipp/dev/nimstoryfont/media:/imagemedia -v /home/philipp/Music/session_audio_backup:/audiomedia --name test nsi