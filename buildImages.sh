nginx_container=production_nginx
nginx_image=nimstoryfont-proxy
ns_container=nswebserver
ns_image=nimstoryfont-nimstoryfont

echo "Removing old containers"
sudo docker container stop $nginx_container
sudo docker container rm $nginx_container
sudo docker container stop $ns_container
sudo docker container rm $ns_container

echo "Removing old images"
sudo docker image rm $nginx_image
sudo docker image rm $ns_image

echo "Creating new images"
sudo docker build --file ./buildFiles/nginx/dockerfile --tag $nginx_image ./buildFiles/nginx
sudo docker build --file ./buildFiles/nimstoryfont/dockerfile --tag $ns_image ./buildFiles/nimstoryfont
