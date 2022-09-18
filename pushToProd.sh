nimble alpine # Build Binary
bash buildImages.sh # Build Images with binary

# Generate tar files from built images
sudo docker save -o nginx_image.tar nimstoryfont-proxy 
sudo docker save -o ns_image.tar nimstoryfont-nimstoryfont

sudo chmod 777 nginx_image.tar
sudo chmod 777 ns_image.tar
bash ./disabledev.sh # in case /etc/hosts file redirects still to localhost

# Upload tar files
scp nginx_image.tar isofruit@aldrune.com:~/nginx_image.tar
scp ns_image.tar isofruit@aldrune.com:~/ns_image.tar
#ssh isofruit@aldrune.com 'bash startNimstoryfont.sh'