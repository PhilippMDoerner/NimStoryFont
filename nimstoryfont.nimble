# Package

version       = "2.0.0"
author        = "PhilippMDoerner"
description   = "A web-application backend written in nim. The backend of a webpage to store information about your dnd campaigns."
license       = "GPL-3.0-or-later"
srcDir        = "src"
bin           = @["nimstoryfont"]


# Dependencies
requires "nim >= 1.9.1"
requires "norm >= 2.8.7" # requires "norm >= 2.6.0" # A norm fork for use until norm is nim 2.0 ready, see https://github.com/moigagoo/norm/issues/182
requires "prologue#09ac7ac735606d20f7b2ee1afe478c5b840e2cd2" # requires prologue > 6.6. Prior versions parsed request-bodies of forms containing files incorrectly. 
requires "lowdb >= 0.2.0"
requires "jsony >= 1.1.3"
requires "constructor >= 1.1.1"
requires "zippy >= 0.10.6"
requires "smtp >= 0.1.0"
requires "nimword >= 1.0.1"

import std/strformat
let domain = "aldrune.com"

let nginx_container = "production_nginx"
let nginx_image = "nimstoryfont-proxy"
let nginx_image_tarname = "nginx_image.tar"

let ns_container = "nswebserver"
let ns_image = "nimstoryfont-nimstoryfont"
let ns_image_tarname = "ns_image.tar"

# Tasks
task alpine, "Build an alpine release":
  --verbose
  --gcc.exe:"musl-gcc"
  --gcc.linkerexe:"musl-gcc"
  --forceBuild:on
  --deepcopy:on
  --passc:"-fpermissive"
  --passl:"-fpermissive"
  --threads:on
  --opt:speed
  --define:release
  --define:lto
  --define:ssl
  --define:appsettings
  --undef:nimPreviewRangeDefault # This is extremely unstable and exists solely so that constructor doesn't explode when using fields with type "Natural" or ranges
  --hint:"XCannotRaiseY:off"
  --warning:"BareExcept:off"
  --styleCheck:usages
  --spellSuggest:50
  --mm:orc
  --outdir:"buildFiles/nimstoryfont"
  setCommand "c", "src/nimstoryfont.nim"

task debug, "Build a normal debug build":
  --verbose
  --deepcopy:on
  --threads:on
  --mm:orc
  --define:enableTinyPoolLogging
  --define:normDebug
  --define:ssl
  --stackTrace:on
  --lineTrace:on
  --styleCheck:usages
  --spellSuggest:50
  --excessiveStackTrace:on
  --define:appsettings
  --outdir:"buildFiles/nimstoryfont"
  setCommand "c", "src/nimstoryfont.nim"

task alpine_debug, "Build a release for debugging":
  exec "nim -v"
  --passc:"-fpermissive"
  --passl:"-fpermissive"
  --gcc.exe:"musl-gcc"
  --gcc.linkerexe:"musl-gcc"
  --threads:on
  --mm:orc
  --deepcopy:on
  --define:ssl
  --define:enableTinyPoolLogging
  --define:normDebug
  --define:nimDebugDlOpen
  --define:appsettings
  --stackTrace:on
  --lineTrace:on
  --styleCheck:usages
  --undef:nimPreviewRangeDefault # This is extremely unstable and exists solely so that constructor doesn't explode when using fields with type "Natural" or ranges
  #--styleCheck:error
  --spellSuggest:50
  --excessiveStackTrace:on
  --warning:"BareExcept:off"
  #--hintAsError[XDeclaredButNotUsed]:on #Can't be used because systems.nim itself has screwy stuff
  #--warningAsError[UnusedImport]:on #Can't be used because systems.nim itself has screwy stuff
  #--debugger:native
  --outdir:"buildFiles/nimstoryfont"
  setCommand "c", "src/nimstoryfont.nim"

task normal_debug, "Build a release for debugging":
  --threads:on
  --mm:orc
  --deepcopy:on
  --define:ssl
  --define:enableTinyPoolLogging
  --define:normDebug
  --define:appsettings
  --stackTrace:on
  --lineTrace:on
  --styleCheck:usages
  #--styleCheck:error
  --undef:nimPreviewRangeDefault # This is extremely unstable and exists solely so that constructor doesn't explode when using fields with type "Natural" or ranges
  --spellSuggest:50
  --excessiveStackTrace:on
  --warning:"BareExcept:off"
  #--hintAsError[XDeclaredButNotUsed]:on #Can't be used because systems.nim itself has screwy stuff
  #--warningAsError[UnusedImport]:on #Can't be used because systems.nim itself has screwy stuff
  --debugger:native
  --outdir:"buildFiles/nimstoryfont"
  setCommand "c", "src/nimstoryfont.nim"

task compileDataExporterJob, "Compiles the data exporter job for local development":
  --verbose
  --forceBuild:on
  --deepcopy:on
  --cc:clang 
  --clang.exe:"zigcc" 
  --clang.linkerexe:"zigcc" 
  --passC:"-fpermissive -target x86_64-linux-gnu.2.31 -fno-sanitize=undefined"
  --passL:"-fpermissive -target x86_64-linux-gnu.2.31 -fno-sanitize=undefined"
  --define:release
  --define:lto
  --define:ssl
  --debugger:native
  --undef:nimPreviewRangeDefault # This is extremely unstable and exists solely so that constructor doesn't explode when using fields with type "Natural" or ranges
  --hint:"XCannotRaiseY:off"
  --warning:"BareExcept:off"
  --styleCheck:usages
  --spellSuggest:50
  --mm:orc
  --outdir:"buildFiles/nimstoryfont/jobs"
  setCommand "c", "src/jobs/dataExportJob.nim"
  
task rebuildFTS5Table, "":
  exec "nim r --define:ssl --outdir:sql --deepcopy:on --undef:nimPreviewRangeDefault --path:/home/philipp/.nimble/pkgs2/norm-2.7.0-00a93c0f5628651c98c933909f3c3c3cd17696f0 ./sql/rebuild_fts5_table.nim"

task build_images, "Builds an nginx docker image for this project to use with docker compose":
  echo "\nRemoving old containers"
  echo staticExec(fmt"sudo docker container stop {nginx_container}")
  echo staticExec(fmt"sudo docker container stop {ns_container}")
  echo staticExec(fmt"sudo docker container rm {nginx_container}")
  echo staticExec(fmt"sudo docker container rm {ns_container}")

  echo "\nRemoving old images"
  echo staticExec(fmt"sudo docker image rm {nginx_image}")
  echo staticExec(fmt"sudo docker image rm {ns_image}")

  echo "\nCreating new images"
  exec(fmt"sudo docker build --file ./buildFiles/nginx/dockerfile --tag {nginx_image} ./buildFiles/nginx")
  exec(fmt"sudo docker build --file ./buildFiles/nimstoryfont/dockerfile --tag {ns_image} ./buildFiles/nimstoryfont")

task build_nginx, "Builds an nginx docker image for this project to use with docker compose":
  echo "\nRemoving old container"
  echo staticExec(fmt"sudo docker container stop {nginx_container}")
  echo staticExec(fmt"sudo docker container rm {nginx_container}")

  echo "\nRemoving old images"
  echo staticExec(fmt"sudo docker image rm {nginx_image}")

  echo "\nCreating new images"
  exec(fmt"sudo docker build --file ./buildFiles/nginx/dockerfile --tag {nginx_image} ./buildFiles/nginx")


task save_images, "Store images as tar files for current nginx and nimstoryfont images":
  echo staticExec(fmt"sudo docker save -o {nginx_image_tarname} {nginx_image}")
  echo staticExec(fmt"sudo docker save -o {ns_image_tarname} {ns_image}")
  echo staticExec(fmt"sudo chmod 777 {nginx_image_tarname}")
  echo staticExec(fmt"sudo chmod 777 {ns_image_tarname}")

task enabledev, "Changes the hosts file to change DNS lookups to the 'aldrune.com' domain get routed to localhost":
  exec(fmt"""sudo sh -c "echo '127.0.0.1       {domain}' >> /etc/hosts"""")
  exec(fmt"""sudo sh -c "echo '127.0.0.1       www.{domain}' >> /etc/hosts"""")

task disabledev, "Changes the hosts file so that DNS lookups to the 'aldrune.com' domain get routed to the internet":
  exec(fmt"sudo sed -i /'127.0.0.1       {domain}'/d  /etc/hosts")
  exec(fmt"sudo sed -i /'127.0.0.1       www.{domain}'/d  /etc/hosts")

task local_deploy, "Stops and removes prior container and images, rebuilds the images and runs them":
  exec("nimble alpine_debug")
  exec("nimble build_images")
  exec("nimble enabledev")

  echo "\nComposing up!"
  exec("sudo docker-compose up")

task prod_deploy, "Stops and removes prior container and images, recompiles the binary, rebuilds the images and copies them to the server":
  exec("nimble alpine")
  #exec("nimble rebuildFTS5Table") #Should be done in case a change in how overview serialization is done occurs
  exec("nimble build_images")
  exec("nimble save_images")
  exec("nimble disabledev")

  exec(fmt"scp {nginx_image_tarname} isofruit@{domain}:~/")
  exec(fmt"scp {ns_image_tarname} isofruit@{domain}:~/")
  #exec(fmt"ssh isofruit@aldrune.com 'bash startNimstoryfont.sh'")

task job_prod_deploy, "Compiles and copies job binaries to prod":
  exec("nimble compileDataExporterJob")
  exec(fmt"scp buildFiles/nimstoryfont/jobs/* isofruit@{domain}:~/jobs")

task createCert, "Creates a self-signed SSL certificate":
  exec("openssl req -newkey rsa:4096  -x509  -sha512  -days 3650 -nodes -out fullchain.pem -keyout privkey.pem")

