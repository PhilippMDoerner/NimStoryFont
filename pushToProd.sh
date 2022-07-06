nimble alpine
sudo docker build -t nsi_prod .

sudo docker save -o image.tar nsi_prod
sudo chmod 777 image.tar

scp image.tar isofruit@aldrune.com:~/image.tar