<h2 align="center">HyperPlanner</h2>
<h3 align="center">The Web App for planning/reviewing all 4 years of college!</h3>

![Banner](https://user-images.githubusercontent.com/44514622/105098661-43c04880-5a5f-11eb-833f-c545aa39a037.PNG)

<h3 align="center">Check it out <a href="https://www.hyperplanner.io/">here</a>!</h3>


<p align="center"> 
  <a href=https://forthebadge.com>
    <img src="https://forthebadge.com/images/badges/built-with-grammas-recipe.svg"></a>
  </br>
  <a href=https://app.netlify.com/sites/hyperplanner/deploys>
    <img src=https://api.netlify.com/api/v1/badges/c938739e-15ab-4c97-9e21-217e6acdbe13/deploy-status></a>
  <a href=https://travis-ci.com/JeremyTsaii/hyperplanner>
    <img src="https://travis-ci.com/JeremyTsaii/hyperplanner.svg?branch=master"></a>
  <a href=http://hits.dwyl.com/JeremyTsaii/hyperplanner>
    <img alt="HitCount" src=http://hits.dwyl.com/JeremyTsaii/hyperplanner.svg></a>
  <a href=https://david-dm.org/JeremyTsaii/hyperplanner>
    <img alt="Dependencies" src=https://david-dm.org/JeremyTsaii/hyperplanner.svg></a>
  <a href="https://david-dm.org/JeremyTsaii/hyperplanner#info=devDependencies">
    <img alt="DevDependencies" src=https://david-dm.org/JeremyTsaii/hyperplanner/dev-status.svg></a>
  </br>
  <a href=https://github.com/dwyl/esta/issues>
    <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat"></a>
  <a href=https://opensource.org/licenses/MIT>
    <img src=https://img.shields.io/badge/License-MIT-yellow.svg></a>
  <a href=https://github.com/prettier/prettier>
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
</p>

***

## List of currently-supported schools:
- Harvey Mudd College

## How was this developed?

- TypeScript and React used for Frontend

- AWS (S3, SQS, SNS, Textract, Lambda, API Gateway) and Python used for transcript text recognition [(repo)](https://github.com/JeremyTsaii/HyperPlannerTextExtraction)

- AWS (Lambda, API Gateway, AppSyn) and Golang used for querying courses [(repo)](https://github.com/JeremyTsaii/HyperPlannerCourses) - experimental

- Netlify used for deployment of the web app

- Travis CI used for CI/CD tests

- Jest/React Testing Library used for unit tests

- Prettier and ESLint (Airbnb preferences) used for best coding practices

- Auth0 used for user authentication/authorization

- Google Analytics used to track site statistics

## Where is the Backend?

The Backend of HyperPlanner uses Hasura, which is an open source engine connecting our PostgreSQL Database to our GraphQL Backend. This is hosted on Heroku, located [here](https://hyperplanner.herokuapp.com/console). The Frontend communicates with the GraphQL engine using Apollo Client.

## What is the development workflow?

First clone the repository onto your local machine.
You can then run the following commands:

#### `npm install`

Install all of the depedencies.

#### `npm run start`

Runs the app in the development mode with live updates.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run format:fix`

Formats the files with Prettier.<br />

#### `npm run lint:fix`

Lints the files with ESLint.<br />

#### `npm run test`

Runs the test suite. Make sure that all tests pass before committing/pushing!<br />



