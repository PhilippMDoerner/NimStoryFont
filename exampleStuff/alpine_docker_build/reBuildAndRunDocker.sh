#!/bin/bash
sudo docker container stop test
sudo docker container rm test

# Libs that are needed:
# musl - sqlite-libs - openssl 
# TODO: Try to link to all of those dynamically... or figure out if you can compile musl statically into your stuff and only link sqlite and openssl dynamically
# --passL:"-L<MUSL_DIRECTORY> -l<MUSL_STATIC_LIB> <-- replace the placeholders
nim c \
--gcc.exe="musl-gcc" \
--gcc.linkerexe="musl-gcc" \
--forceBuild:on \
--opt:speed \
--deepcopy:on \
--mm:orc \
--define:release \
--define:lto \
--define:ssl \
--outdir:"." \
src/nimstoryfont.nim

sudo docker build -t nsi_prod .

echo "Run new container"
sudo docker run -p 80:80 -p 443:443 \
-v /etc/nginx/certificates:/cert/live/www.aldrune.com:ro \
-v /etc/nginx/certificates:/cert/archive/www.aldrune.com:ro \
-v $HOME/dev/nimstoryfont/:/database \
-v $HOME/dev/nimstoryfont/media:/imagemedia \
-v $HOME/Music/session_audio_backup:/session_audio \
-v $HOME/Music/session_audio_backup/extended:/session_audio/extended \
-v $HOME/dev/aldrunewikifrontend/dist/frontend:/frontend \
-v /tmp:/var/log/nginx \
--name test nsi_prod

