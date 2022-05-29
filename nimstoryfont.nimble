# Package

version       = "0.1.0"
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
requires "tinypool >= 0.3.1"
requires "jwt >= 0.2.0"
requires "nimcrypto >= 0.5.4"
requires "zippy >= 0.9.7"

# Tasks
task release, "Build a production release":
  --verbose
  --forceBuild:on
  --opt:speed
  --define:release
  --define:lto
  --define:ssl
  --define:usestd  # stdlib asynchttpserver
  --define:logueRouteLoose  # optional loose routing
  --hints:off
  --outdir:"."
  setCommand "c", "src/nimstoryfont.nim"