# Package

version       = "1.0.0"
author        = "PhilippMDoerner"
description   = "A new awesome nimble package"
license       = "GPL-3.0-or-later"
srcDir        = "src"
bin           = @["nimstoryfont"]


# Dependencies

requires "nim >= 1.6.2"
requires "norm >= 2.4.0"
requires "prologue >= 0.6.0"
requires "jsony >= 1.1.2"
requires "constructor >= 1.0.3"
requires "tinypool >= 1.0.0"
requires "jwt >= 0.2.0"
requires "zippy >= 0.9.7"
#requires "nimpy >= 0.2.0" only necessary when using nimpy in djangoencryption.nim
#requires "nimcrypto >= 0.5.4" only necessary when using nimcrypto in djangoencryption.nim


# Tasks
task release, "Build a production release":
  --verbose
  --forceBuild:on
  --opt:speed
  --define:release
  --threads:on
  --mm:orc
  --deepcopy:on
  --define:lto
  --define:ssl
  #--define:usestd  # stdlib asynchttpserver
  --hints:off
  --outdir:"."
  setCommand "c", "src/nimstoryfont.nim"