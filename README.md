# StoryFontBackendNim

A re-implementation of the storyfont backend in nim.
This is a REST-API on top of an sqlite database.

The nim dependencies of this project are:

-   Application Server: prologue - https://github.com/planety/prologue
-   ORM + connection pooling: norm - https://github.com/moigagoo/norm
-   (De)Serializing JSON to/from ORM models: jsony - https://github.com/treeform/jsony
-   Simplifaction of model-object construction: constructor - https://github.com/beef331/constructor
-   Compressing HTTP Responses: zippy - https://github.com/guzba/zippy
-   Password Hashing: Nimword - https://github.com/PhilippMDoerner/nimword
-   Sending emails: smtp - https://github.com/nim-lang/smtp

Beyond that in terms of tooling and software this project uses:

-   Flyway - For database migrations using raw SQL
-   Docker - For containerization with alpine
-   Nginx - As reverse proxy HTTP server
-   Musl - To link the binary against instead of glibc for use with alpine
-   SQLite - The database

## Feature Scope

Nimstoryfont is the backend of a CRUD heavy web application, previously called AldruneWiki.
It is a wiki capable of hosting dnd campaigns, capable of highly performant processing of requests and pageloads.
The corresponding frontend SPA written in Angular is to be found
here: https://github.com/PhilippMDoerner/nimstoryfont-gui

Campaigns can be administered by the campaign's individual admin. They can add and remove members as they desire.

It allows writing articles for the following parts of a DnD Campaign:

-   Character
-   Creature
-   Diaryentries (aka Session notes)
-   Items of any importance
-   Locations
-   Organizations and their members
-   Quests
-   Rules
-   Sessions (When they happened, not what happened in them, that is to be recorded in Diaryentries)
-   Spells
-   Quotes

Beyond that notable features include:

-   Displaying (leaflet) maps on which locations can be marked with customizable icons
-   Upload and stream recordings of your sessions, including timestamping them for later use
-   Creating data-dumps for individual campaigns to download, enabling offline-browsing of campaign data. This is done via the dataExportJob file
