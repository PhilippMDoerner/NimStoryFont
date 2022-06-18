# StoryFontBackendNim

A re-implementation of the storyfont backend in nim.
This is a REST-API on top of an sqlite database.

The nim dependencies of this project are:

-   Application Server: prologue - https://github.com/planety/prologue
-   ORM for normal tables: norm - https://github.com/moigagoo/norm
-   ORM for views and sqlite-FTS tables: nisane - https://github.com/enthus1ast/nisane
-   JWT-handling: jwt - https://github.com/yglukhov/nim-jwt
-   (De)Serializing JSON to/from ORM models: jsony - https://github.com/treeform/jsony
-   Password hashing: nimcrypto - https://github.com/cheatfate/nimcrypto
-   Password hashing (alternative implementation): nimpy - https://github.com/yglukhov/nimpy
-   Simplifaction of model-object construction: constructor - https://github.com/beef331/constructor
-   Connection pooling: tinypool - https://github.com/PhilippMDoerner/TinyPool
-   Compressing HTTP Responses: zippy - https://github.com/guzba/zippy

The python dependencies of this project are:
-   hashlib
-   django.utils.encoding

# General Architecture Idea
Every domain has its own "application" folder named after the domain (with the exception of the "core" folder).
Typically a domain encompasses 1-2 tables in this project, as everything in this project is **very** CRUD heavy.

Files within this project follow the following naming scheme, where "X" is the name of a domain:

- XModel - The norm-model(s) used to query the DB. Some have a "Read"-suffix. This means they're only for reading from the database. These extra models exist so that insert/update/delete can be done with the normal models without unnecessary extra leg work, while reads where more information is necessary can be done using these models. Other models may be cut down (most of those have an "overview"-suffix) to reduce unnecessary work.
- XRepository - Handles specific queries that aren't covered by genericArticleRepository. May be ommitted if not needed.
- XService - Receives queryParams-type objects (as defined in `allUrlParams.nim`) and calls the corresponding repository proc with the arguments it requries out of the queryParams. Most of the time almost nothing interesting happens here. May be ommitted if not needed or genericArticlService does the job.
- XRoutes - Contains a single proc that adds the various routes for this application. All of these are imported into the root `routes.nim` file where they're made into one gigantic proc that adds all the 100+ routes to prologue
- XUtils - Utility procs for the models of this application. Most of the time that's procs checking whether you have access permission (where I can't use the generic version from `authenticationUtils` for some reason due to compiler complaints) and procs for stringifying Model-object-instances
- XControllers - Custom handler procs when they're doing more than just CRUD work. May be ommitted if the necessary handler procs can be generated using genericArticleController procs, which build handler-procs for you.
- XSerialization - Converts model-object of this domain into a "Serializable" that jsony later can turn into a json-string.
- XDeserialization - Covers procs and helper procs used to deserialize the JSON sent via PUT, PATCH and POST HTTP Requests to update/create entries in the database

# General Control Flow
Within the typical Handler-Proc of this application, we have this control flow in read-procs:

Request

--> Controller : Gets called and passed the request. Extracts all kinds of parameters, settings and request-body, dumps them into a query-params object and passes that + a database connection onto the service.

--> Service : Takes the query params objects and takes the parameters it needs from it to call a repository proc to fetch data using the given database connection

--> Repository : Performs a query with the given parameters using the given database connection. Most of the time that's by using norm-procs. For more complicated things or queries on views, this may use raw-SQL whose output is then converted into an object using nisane. This is returned to the Service

--> Service : Passes repository results to Controller

--> Controller : Checks if the caller of the request actually is allowed to have access to the entries that were fetched. If yes, they're passed on to Serialization, if no, HTTP401 response.

--> Serialization : Converts the model-objects that the Repository fetched from the DB into "Serializable"-objects which contain the fields I need in my JSON-output. May make further DB-queries as part of the serialization process to fetch related many-to-many/many-to-one relationships that are required. Passes that back to Controller

--> Controller : Passes the serialized data to jsonyResponse

--> jsonyResponse : Uses jsony to turn the serializable-object into a json-string