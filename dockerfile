FROM frolvlad/alpine-glibc

# Install dependencies
RUN apk update
RUN apk add --no-cache nginx openrc
RUN apk add --no-cache sqlite-libs

# Expose Ports -- Mostly documentation for later
#EXPOSE 80/tcp
#EXPOSE 443/tcp
#EXPOSE 8080 ##Only for Debug purposes

# Copy necessary files
COPY ./nimstoryfont .
COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY ./settings.json .
RUN chmod 777 /settings.json

#Remove later with mount stuff
COPY ./db.sqlite3 . 

# Setup necessary directories
RUN mkdir -p /run/nginx
RUN mkdir /etc/nginx/sites-available
RUN mkdir /etc/nginx/sites-enabled
COPY ./config/nimstoryfont.com /etc/nginx/sites-available
RUN ln -s /etc/nginx/sites-available/nimstoryfont.com /etc/nginx/sites-enabled/nimstoryfont.com

# Mount external directories

#Startup command
COPY ./startDocker.sh .
RUN chmod +x /startDocker.sh

CMD ["/startDocker.sh"]
# RUN /nimstoryfont

# STOPSIGNAL SIGTERM
# CMD ["nginx", "-g", "daemon off;"]
# ENTRYPOINT [ "/bin/sh" ]

## https://www.tutorialspoint.com/how-do-i-get-into-a-docker-container-s-shell
## https://www.youtube.com/watch?v=SnSH8Ht3MIc
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