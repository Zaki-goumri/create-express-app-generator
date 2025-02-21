# create-express-app-generator
A CLI tool to quickly set up an Express app with optional features like JavaScript/TypeScript support, template engines, and more.

Features :

Quick Setup: Generate a fully functional Express app in seconds.

JavaScript/TypeScript Support: Choose between JavaScript or TypeScript.

Future Features:

Template Engines: Optionally add support for EJS, Pug, or Handlebars.

Database Integration: Optionally add MongoDB, PostgreSQL, or MySQL.

Authentication: Optionally add JWT or Passport.js for user authentication.

Installation
Install the package globally using npm:
  
    npm install -g create-express-app-zaki

  Usage
To create a new Express app, run:
    
    create-express-app <app-name>

  This will:

    Create a folder named my-app.

Generate the necessary files (package.json, app.js/app.ts, etc.).

Install dependencies.
During setup, you’ll be prompted to choose Language JavaScript or TypeScript.

Navigate to your project folder: 
   
    cd my-app

Start the app:
For JavaScript:

    npm start
for Typescript

    npm run dev


