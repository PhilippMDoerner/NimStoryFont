FROM alpine

# Install dependencies
RUN apk update
RUN apk add openrc nginx sqlite-libs nginx-mod-http-upload-progress openssl bash

# Expose Ports -- Mostly documentation for later
#EXPOSE 80/tcp
#EXPOSE 443/tcp
#EXPOSE 8080 ##Only for Debug purposes

# Copy necessary files
COPY ./nimstoryfont .
COPY ./buildFiles/config/nginx_prod.conf /etc/nginx/nginx.conf
COPY ./buildFiles/config/dockerSettings.json /settings.json
COPY ./buildFiles/config/50x.html /usr/share/nginx/html/50x.html
# Setup necessary directories
RUN mkdir -p /run/nginx
RUN mkdir /database
RUN mkdir -p /cert/live/www.aldrune.com
RUN mkdir -p /cert/archive/www.aldrune.com
RUN mkdir /imagemedia
RUN mkdir /tmpfiles
        # The session_audio directory will be mapped to a directory that also contains a /extended dir. That is an extra volume of Linode for storage
RUN mkdir /session_audio
RUN ln -s /session_audio /audiodownloads
RUN mkdir /frontend

# Mount external directories

#Startup command
COPY ./buildFiles/config/dockerStartScript.sh .
RUN chmod +x /dockerStartScript.sh

CMD ["/dockerStartScript.sh"]