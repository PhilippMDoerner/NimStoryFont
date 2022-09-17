echo "Removing old containers"
sudo docker container stop production_nginx
sudo docker container rm production_nginx
sudo docker container stop backend
sudo docker container rm backend

echo "Removing old images"
sudo docker image rm nimstoryfont-proxy
sudo docker image rm nimstoryfont-nimstoryfont

echo "Creating new images"
sudo docker build --file ./buildFiles/nginx/dockerfile --tag nimstoryfont-proxy ./buildFiles/nginx
sudo docker build --file ./buildFiles/nimstoryfont/dockerfile --tag nimstoryfont-nimstoryfont ./buildFiles/nimstoryfont
