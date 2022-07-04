#!/bin/bash
sudo docker container stop test
sudo docker container rm test

nim c \
--cc:clang \
--clang.exe="zigcc" \
--clang.linkerexe="zigcc" \
--passC:"-target x86_64-linux-gnu.2.24 -fno-sanitize=undefined" \
--passL:"-target x86_64-linux-gnu.2.24 -fno-sanitize=undefined" \
--forceBuild:on \
--opt:speed \
--deepcopy:on \
--mm:orc \
--stackTrace:on \
--lineTrace:on \
--define:lto \
--define:ssl \
--define:enableTinyPoolLogging \
--define:normDebug \
--outdir:"." \
src/nimstoryfont.nim

sudo docker build -t nsi_prod .

echo "Run new container"
sudo docker run -p 80:80 -p 443:443 -p 8080:8080 \
-v /etc/nginx/certificates:/cert/live/www.aldrune.com:ro \
-v /etc/nginx/certificates:/cert/archive/www.aldrune.com:ro \
-v $HOME/dev/nimstoryfont/:/database \
-v $HOME/dev/nimstoryfont/media:/imagemedia \
-v $HOME/Music/session_audio_backup:/session_audio \
-v $HOME/Music/session_audio_backup/extended:/session_audio/extended \
-v $HOME/dev/aldrunewikifrontend/dist/frontend:/frontend \
-v /tmp:/var/log/nginx \
--name test nsi_prod