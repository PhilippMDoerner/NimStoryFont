# StoryFontBackendNim

A re-implementation of the storyfont backend in nim.
This is a REST-API on top of an sqlite database.

The dependencies of this project are:

-   Application Server: prologue - https://github.com/planety/prologue
-   ORM: norm - https://github.com/moigagoo/norm
-   JWT-handling: jwt - https://github.com/yglukhov/nim-jwt
-   (De)Serializing JSON to/from ORM models: jsony - https://github.com/treeform/jsony
-   Password hashing: nimcrypto - https://github.com/cheatfate/nimcrypto
-   Simplifaction of model-object construction: constructor - https://github.com/beef331/constructor
-   Connection pooling: tinypool - https://github.com/PhilippMDoerner/TinyPool
