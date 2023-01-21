# Package

version       = "1.0.0"
author        = "PhilippMDoerner"
description   = "A web-application backend written in nim. The backend of a webpage to store information about your dnd campaigns."
license       = "GPL-3.0-or-later"
srcDir        = "src"
bin           = @["nimstoryfont"]


# Dependencies

requires "nim >= 1.6.8"
requires "https://github.com/PhilippMDoerner/norm.git#8784eab" # requires "norm >= 2.6.0" # A norm fork for use until norm is nim 2.0 ready, see https://github.com/moigagoo/norm/issues/182
requires "prologue >= 0.6.2"
requires "jsony >= 1.1.2"
requires "constructor >= 1.0.5" # Upgrade to 1.1.1 when you can
requires "tinypool >= 1.0.3"
requires "zippy >= 0.9.7"
requires "smtp >= 0.1.0"

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
  --threads:on
  --opt:speed
  --define:release
  --define:lto
  --define:ssl
  --undef:nimPreviewRangeDefault # This is extremely unstable and exists solely so that constructor doesn't explode when using fields with type "Natural" or ranges
  --hint:"XCannotRaiseY:off"
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
  --outdir:"buildFiles/nimstoryfont"
  setCommand "c", "src/nimstoryfont.nim"

task alpine_debug, "Build a release for debugging":
  --gcc.exe:"musl-gcc"
  --gcc.linkerexe:"musl-gcc"
  --threads:on
  --mm:orc
  --deepcopy:on
  --define:ssl
  --define:enableTinyPoolLogging
  --define:normDebug
  --stackTrace:on 
  --lineTrace:on 
  --styleCheck:usages
  --undef:nimPreviewRangeDefault # This is extremely unstable and exists solely so that constructor doesn't explode when using fields with type "Natural" or ranges
  #--styleCheck:error
  --spellSuggest:50
  --excessiveStackTrace:on
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
  --stackTrace:on 
  --lineTrace:on 
  --styleCheck:usages
  #--styleCheck:error
  --spellSuggest:50
  --excessiveStackTrace:on
  #--hintAsError[XDeclaredButNotUsed]:on #Can't be used because systems.nim itself has screwy stuff
  #--warningAsError[UnusedImport]:on #Can't be used because systems.nim itself has screwy stuff
  --debugger:native
  --outdir:"buildFiles/nimstoryfont"
  setCommand "c", "src/nimstoryfont.nim"

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
  exec("nimble build_images")
  exec("nimble save_images")
  exec("nimble disabledev")

  exec(fmt"scp {nginx_image_tarname} isofruit@{domain}:~/")
  exec(fmt"scp {ns_image_tarname} isofruit@{domain}:~/")

  #exec(fmt"ssh isofruit@aldrune.com 'bash startNimstoryfont.sh'")