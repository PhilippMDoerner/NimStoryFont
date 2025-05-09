# Package

version = "2.0.0"
author = "PhilippMDoerner"
description =
  "A web-application backend written in nim. The backend of a webpage to store information about your dnd campaigns."
license = "AGPL-3.0-or-later"
srcDir = "src"
bin = @["nimstoryfont"]

# Dependencies
requires "nim >= 1.9.1"
requires "norm >= 2.8.7"
requires "prologue#09ac7ac735606d20f7b2ee1afe478c5b840e2cd2"
  # requires prologue > 6.6. Prior versions parsed request-bodies of forms containing files incorrectly. 
requires "lowdb >= 0.2.0"
requires "jsony >= 1.1.3"
requires "constructor == 1.1.4"
requires "zippy >= 0.10.6"
requires "smtp >= 0.1.0"
requires "nimword >= 1.0.1"
requires "htmlparser >= 0.1.0"

import std/strformat

# Tasks
task alpine, "Build an alpine release for use in an alpine container":
  --verbose
  # --gcc.exe:"musl-gcc" # no longer necessary while compiling inside alpine
  # --gcc.linkerexe:"musl-gcc" # no longer necessary while compiling inside alpine
  --forceBuild:
    on
  --deepcopy:
    on
  --passc:
    "-fpermissive"
  --passl:
    "-fpermissive"
  --threads:
    on
  --opt:
    speed
  --define:
    release
  --define:
    lto
  --define:
    ssl
  --undef:
    nimPreviewRangeDefault
    # This is extremely unstable and exists solely so that constructor doesn't explode when using fields with type "Natural" or ranges
  --hint:
    "XCannotRaiseY:off"
  --warning:
    "BareExcept:off"
  --styleCheck:
    usages
  --spellSuggest:
    50
  --mm:
    orc
  --outdir:
    "buildFiles/nimstoryfont"
  setCommand "c", "src/nimstoryfont.nim"

task alpine_debug,
  "Build an alpine release for debugging for use in an alpine container":
  --passc:
    "-fpermissive"
  --passl:
    "-fpermissive"
  # --gcc.exe:"musl-gcc" # no longer necessary while compiling inside alpine
  # --gcc.linkerexe:"musl-gcc" # no longer necessary while compiling inside alpine
  --threads:
    on
  --mm:
    orc
  --deepcopy:
    on
  --define:
    ssl
  --define:
    enableTinyPoolLogging
  --define:
    normDebug
  --define:
    nimDebugDlOpen
  --stackTrace:
    on
  --lineTrace:
    on
  --styleCheck:
    usages
  --undef:
    nimPreviewRangeDefault
    # This is extremely unstable and exists solely so that constructor doesn't explode when using fields with type "Natural" or ranges
  #--styleCheck:error
  --spellSuggest:
    50
  --excessiveStackTrace:
    on
  --warning:
    "BareExcept:off"
  #--hintAsError[XDeclaredButNotUsed]:on #Can't be used because systems.nim itself has screwy stuff
  #--warningAsError[UnusedImport]:on #Can't be used because systems.nim itself has screwy stuff
  #--debugger:native
  --outdir:
    "buildFiles/nimstoryfont"
  setCommand "c", "src/nimstoryfont.nim"

task compileDataExporterJob, "Compiles the data exporter job for local development":
  --verbose
  --forceBuild:
    on
  --deepcopy:
    on
  --cc:
    clang
  --clang.exe:
    "zigcc"
  --clang.linkerexe:
    "zigcc"
  --passC:
    "-fpermissive -target x86_64-linux-gnu.2.31 -fno-sanitize=undefined"
  --passL:
    "-fpermissive -target x86_64-linux-gnu.2.31 -fno-sanitize=undefined"
  --define:
    release
  --define:
    lto
  --define:
    ssl
  --debugger:
    native
  --undef:
    nimPreviewRangeDefault
    # This is extremely unstable and exists solely so that constructor doesn't explode when using fields with type "Natural" or ranges
  --hint:
    "XCannotRaiseY:off"
  --warning:
    "BareExcept:off"
  --styleCheck:
    usages
  --spellSuggest:
    50
  --mm:
    orc
  --outdir:
    "buildFiles/nimstoryfont/jobs"
  setCommand "c", "src/jobs/dataExportJob.nim"

task rebuildFTS5Table, "":
  exec "nim r --define:ssl --outdir:sql --deepcopy:on --undef:nimPreviewRangeDefault --path:/home/philipp/.nimble/pkgs2/norm-2.7.0-00a93c0f5628651c98c933909f3c3c3cd17696f0 ./sql/rebuild_fts5_table.nim"

task createCert, "Creates a self-signed SSL certificate":
  exec(
    "openssl req -newkey rsa:4096  -x509  -sha512  -days 3650 -nodes -out fullchain.pem -keyout privkey.pem"
  )
