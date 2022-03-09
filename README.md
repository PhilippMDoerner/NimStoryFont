# StoryFontBackendNim

A re-implementation of the storyfont backend in nim.
This is a REST-API on top of an sqlite database.

The dependencies of this project are:

-   Application Server: prologue - https://github.com/planety/prologue
-   ORM for normal tables: norm - https://github.com/moigagoo/norm
-   ORM for views and sqlite-FTS tables: nisane - https://github.com/enthus1ast/nisane
-   JWT-handling: jwt - https://github.com/yglukhov/nim-jwt
-   (De)Serializing JSON to/from ORM models: jsony - https://github.com/treeform/jsony
-   Password hashing: nimcrypto - https://github.com/cheatfate/nimcrypto
-   Simplifaction of model-object construction: constructor - https://github.com/beef331/constructor
-   Connection pooling: tinypool - https://github.com/PhilippMDoerner/TinyPool

# Compilation remarks
## 1) jsony and chronicles issue
There is an incompatibility between jsony and chronicles, a logging framework. Both define `toJson` methods (chronicles does it through one of its own dependencies) and they can conflict, as they do in this project. This can be fixed by editing the jsony package.

Go to .nimble/pkgs/jsony-X.X.X/jsony.nim and edit the `dumpKey` template (should be around line 695) to specify that the `toJson` used in there stems from jsony. The line should look like this `const v2 = jsony.toJson(v) & ":"`. An issue regarding this has been opened (https://github.com/treeform/jsony/issues/47) and the readme will be updated once/if it is resolved.