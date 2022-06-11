FROM frolvlad/alpine-glibc
COPY ./nimstoryfont .
COPY ./config/nginx.conf /etc/nginx/nginx.conf

RUN apk update
RUN apk add --no-cache nginx openrc sqlite-libs
RUN mkdir -p /run/nginx
RUN openrc boot
RUN rc-service nginx start
RUN /nimstoryfont

EXPOSE 80/tcp
EXPOSE 443/tcp

# STOPSIGNAL SIGTERM
# CMD ["nginx", "-g", "daemon off;"]
# ENTRYPOINT [ "/bin/sh" ]

## https://www.tutorialspoint.com/how-do-i-get-into-a-docker-container-s-shell
##https://www.youtube.com/watch?v=SnSH8Ht3MIc
##Issues I need to figure out: 
## 1) Try to use a debian base so you can run the binary properly
## 2) Try to figure out how to access an sqlite file outside the docker container: https://stackoverflow.com/questions/63421601/how-to-access-sqlite-file-on-host-machine-from-a-docker-container-using-docker-c
## 3) Try to figure out how to store mp3 files outside of the container

# Create image:
# sudo docker build -t nsi .
# 
# Run Image
# sudo docker run -it -p 80:80 -p 443:443 --name test nsi
# 
# Remove container:
# sudo docker container rm nimstorydocker

# Step 1) Make a docker image with nginx
# Step 2) Get nimstoryfont binary copied into the image
# Step 3) Mount an sqlite file external to the container
# Step 4) Mount file volumes (audio1, audio2, images) external to the container
# Step 5) Get webserver to start up