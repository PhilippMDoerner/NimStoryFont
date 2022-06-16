FROM frolvlad/alpine-glibc

# Install dependencies
RUN apk update
RUN apk add --no-cache openrc nginx sqlite-libs nginx-mod-http-upload-progress

# Expose Ports -- Mostly documentation for later
#EXPOSE 80/tcp
#EXPOSE 443/tcp
#EXPOSE 8080 ##Only for Debug purposes

# Copy necessary files
COPY ./nimstoryfont .
COPY ./buildFiles/config/nginx.conf /etc/nginx/nginx.conf
COPY ./buildFiles/config/dockerSettings.json /settings.json
RUN chmod 777 /settings.json

# Setup necessary directories
RUN mkdir -p /run/nginx
RUN mkdir /certificates
RUN mkdir /database
RUN mkdir /imagemedia
RUN mkdir /audiomedia
RUN mkdir /frontend

# Mount external directories

#Startup command
COPY ./buildFiles/config/dockerStartScript.sh .
RUN chmod +x /dockerStartScript.sh

CMD ["/dockerStartScript.sh"]