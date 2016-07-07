React + React Router + MobX boilerplate with a small example app.

### Features
- ES6 on client and server;
- CSSNext and modules;
- Hot module reloading;
- Server side rendering;
- Build server bundle for production;

### To start
- `clone https://github.com/osenvosem/react-mobx-boilerplate`
- `cd react-mobx-boilerplate`
- `npm i`
- `npm start` — development server on port 8080;

### Prepearing for production
- `npm run prod` — build all bundles and start in production mode;

### Command list
- `npm start` — start in development mode;
- `npm start:prod` — start in production mode (only after build process);
- `npm run build:all` — build server and client bundles for production;
- `npm run build:client` — build client bundles;
- `npm run build:server` — build server bundle;
- `npm run prod` — alias for build:all and start:prod
- `npm run clear:builds` — delete all generated bundles;

### Structure
```
app
├── client.js # client entry point
├── modules # parts of an app
│   ├── Notes
│   │   ├── components
│   │   │   ├── AddNote.js
│   │   │   ├── Note.js
│   │   │   └── NoteList.js
│   │   ├── index.js # must export store
│   │   ├── store.js # stores state and actions
│   │   └── styles.css
│   ├── index.js # gathering stores and passing it to component tree
│   └── sharedStyles.css
├── routes.js
└── shared # shared folder available anywhere in the app
    ├── components
    │   └── Header
    └── services
```
