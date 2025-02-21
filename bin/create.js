#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import inquirer from "inquirer";

const appName = process.argv[2];
if (!appName) {
  console.error(
    "Specify a project name: npx create-express-app <project-name>",
  );
  process.exit(1);
}

inquirer
  .prompt([
    {
      type: "list",
      name: "language",
      message: "Choose a language:",
      choices: ["JavaScript", "TypeScript"],
    },
  ])
  .then((answers) => {
    const { language } = answers;
    const isTypeScript = language === "TypeScript";
    
    const projectPath = path.join(process.cwd(), appName);
        fs.mkdirSync(projectPath, { recursive: true });
        const packageJson = {
              name: appName,
              version: '1.0.0',
              main: isTypeScript ? 'dist/app.js' : 'app.js',
              scripts: {
                start: isTypeScript ? 'node dist/app.js' : 'node app.js',
                build: isTypeScript ? 'tsc' : undefined,
                dev: isTypeScript ? 'ts-node-dev app.ts' : 'nodemon app.js',
              },
              dependencies: {
                express: '^4.18.2',
              },
              devDependencies: isTypeScript
                ? {
                    typescript: '^5.0.0',
                    'ts-node-dev': '^2.0.0',
                    '@types/express': '^4.17.17',
                  }
                : {
                    nodemon: '^3.0.0',
                  },
            };
        Object.keys(packageJson.scripts).forEach(
              (key) => packageJson.scripts[key] === undefined && delete packageJson.scripts[key]
            );
        fs.writeFileSync(
              path.join(projectPath, 'package.json'),
              JSON.stringify(packageJson, null, 2)
            );
        const appCode = isTypeScript
              ? `import express from 'express';
        const app = express();
        const port = 3000;
        
        app.get('/', (req, res) => {
          res.send('Hello World!');
        });
        
        app.listen(port, () => {
          console.log(\`Server running at http://localhost:\${port}\`);
        });
        `
              : `const express = require('express');
        const app = express();
        const port = 3000;
        
        app.get('/', (req, res) => {
          res.send('Hello World!');
        });
        
        app.listen(port, () => {
          console.log(\`Server running at http://localhost:\${port}\`);
        });
        `;
        
            const appFileName = isTypeScript ? 'app.ts' : 'app.js';
            fs.writeFileSync(path.join(projectPath, appFileName), appCode);
        
            // Generate tsconfig.json for TypeScript
            if (isTypeScript) {
              const tsConfig = {
                compilerOptions: {
                  target: 'ES6',
                  module: 'commonjs',
                  outDir: './dist',
                  rootDir: './',
                  strict: true,
                  esModuleInterop: true,
                },
              };
              fs.writeFileSync(
                path.join(projectPath, 'tsconfig.json'),
                JSON.stringify(tsConfig, null, 2)
              );
            }
              
            process.chdir(projectPath);
                console.log('Installing dependencies...');
                execSync('npm install', { stdio: 'inherit' });
            
                console.log(`\n✅ Express app created at ${projectPath}`);
                console.log(
                  isTypeScript
                    ? '\nTo start the app in development mode, run: npm run dev'
                    : '\nTo start the app, run: npm start');

  })
  .catch((error) => {
    console.error('Error during prompt:', error);

  });

