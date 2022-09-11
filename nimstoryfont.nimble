# Package

version       = "1.0.0"
author        = "PhilippMDoerner"
description   = "A new awesome nimble package"
license       = "GPL-3.0-or-later"
srcDir        = "src"
bin           = @["nimstoryfont"]


# Dependencies

requires "nim >= 1.6.2"
requires "norm >= 2.5.0"
requires "prologue >= 0.6.0"
requires "jsony >= 1.1.2"
requires "constructor >= 1.0.3"
requires "tinypool >= 1.0.0"
requires "jwt >= 0.2.0"
requires "zippy >= 0.9.7"


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
  --styleCheck:usages
  --spellSuggest:50
  --mm:orc
  --define:ssl
  --outdir:"."
  setCommand "c", "src/nimstoryfont.nim"

task debug, "Build a normal debug build":
  --verbose
  --deepcopy:on
  --threads:on
  --define:lto
  --mm:orc
  --define:enableTinyPoolLogging
  --define:normDebug
  --stackTrace:on 
  --lineTrace:on 
  --styleCheck:usages
  --spellSuggest:50
  --excessiveStackTrace:on
  --define:ssl
  --define:verbose
  --outdir:"."
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
  #--styleCheck:error
  --spellSuggest:50
  --excessiveStackTrace:on
  #--hintAsError[XDeclaredButNotUsed]:on #Can't be used because systems.nim itself has screwy stuff
  #--warningAsError[UnusedImport]:on #Can't be used because systems.nim itself has screwy stuff
  #--debugger:native
  --outdir:"."
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
  --outdir:"."
  setCommand "c", "src/nimstoryfont.nim"