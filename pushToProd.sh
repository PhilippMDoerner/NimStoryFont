nimble alpine
sudo docker build -t nsi_prod .

sudo docker save -o image.tar nsi_prod
sudo chmod 777 image.tar
bash ./disabledev.sh

scp image.tar isofruit@aldrune.com:~/image.tar
#ssh isofruit@aldrune.com 'bash startNimstoryfont.sh'