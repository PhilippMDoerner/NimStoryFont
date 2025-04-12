# Storyfont-Frontend

This is a re-built Angular frontend client of Storyfont, a PWA-ready webpage built to share your campaign notes with your fellow players. The matching backend is [here](https://github.com/PhilippMDoerner/NimStoryFont). This application allows documenting the following things:

1. Creatures
2. Characters
3. Sessionnotes in the form of diaryentries, split into individual scenes aka Encounters
4. Items
5. Locations
6. Maps including markers for locations
7. Organizations
8. Quests
9. Audio recordings of the session including timestamps
10. Rules
11. Spells
12. Quotes

Beyond that it contains the following features:

1. A visual graph representation of Characters, Organizations, Locations and Items using an interactive d3js graph
2. Read-only offline mode. By downloading dumps of all data of a campaign you have access to and storing those in an indexed db + storing global data via service worker, the project allows for a read-only offline mode of _most_ data.

It is multi-tenant, therefore can house multiple campaigns side-by-side.
Permissions are handled on a per-campaign basis where campaign-admins can add/remove users from campaigns.

# Storybook and Architecture

This re-built frontend includes a storybook for individual components. It now follows atomic-design principles as well as the smart-dumb component architecture. All pages are represented via templates, made up of organisms, molecules and atoms. All of them are representational "dumb" components.

Pages are what connect the Templates to the backend, namely an NgRx store.

[The storybook can be accessed here](https://philippmdoerner.github.io/nimstoryfont-gui/)

# Supported Browsers

This project explicitly supports Chromium based Browsers as well as Firefox.
It explicitly does not support Safari, due to the resources this would cost to account for. It likely still works, but I can not troubleshoot for it.

# Dependencies

- Angular
- @asymmetrik/ngx-leaflet - The leaflet map
- @ng-bootstrap/ng-bootstrap - For Components: Sidebar, Infocircle, Accordion, ImageCarousel, Toast/ToastOverlay
- @ngrx - SignalStore
- @ngx-formly - Generating Forms in bootstrap-style
- @popperjs - Dependency for ng-bootstrap
- @tinymce - Texteditor
- animate.css - BackgroundImage-Animation - TODO: Refactor this out
- leaflet - For map... maybe dependncy of ngx-leaflet, maybe it can be used on its own
- bootstrap - Visuals, utility classes and components
- plyr - Audioplayer
- d3js - Visualizes a graph of the articles and their connections
