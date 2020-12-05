# HyperPlanner
![Banner](https://iili.io/dKj5lf.png)

### The Web App for planning/reviewing all 4 years of college!

[![forthebadge](https://forthebadge.com/images/badges/built-with-grammas-recipe.svg)](https://forthebadge.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c938739e-15ab-4c97-9e21-217e6acdbe13/deploy-status)](https://app.netlify.com/sites/hyperplanner/deploys)

[![Build Status](https://travis-ci.com/JeremyTsaii/hyperplanner.svg?branch=master)](https://travis-ci.com/JeremyTsaii/hyperplanner)

<!-- [![Maintainability](https://api.codeclimate.com/v1/badges/80bb8a05abd8bfa7b70b/maintainability)](https://codeclimate.com/github/JeremyTsaii/hyperplanner/maintainability) -->

<!-- [![codecov](https://codecov.io/gh/JeremyTsaii/hyperplanner/branch/master/graph/badge.svg)](https://codecov.io/gh/JeremyTsaii/hyperplanner) -->

[![HitCount](http://hits.dwyl.com/JeremyTsaii/hyperplanner.svg)](http://hits.dwyl.com/JeremyTsaii/hyperplanner)

[![Dependency Status](https://david-dm.org/JeremyTsaii/hyperplanner.svg)](https://david-dm.org/JeremyTsaii/hyperplanner)

[![devDependency Status](https://david-dm.org/JeremyTsaii/hyperplanner/dev-status.svg)](https://david-dm.org/JeremyTsaii/hyperplanner#info=devDependencies)

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

***

## List of currently-supported schools:
- Harvey Mudd College

## How was this developed?

- Frontend of HyperPlanner made using TypeScript and React

- Netlify used for deployment of the web app

- Travis CI used for CI/CD tests

- Jest/React Testing Library used for unit tests

<!-- - Code Coverage and Code Climate used to assess the maintainability of the code and the coverage of tests -->

- Docker used to create a consistent development environment

- Makefile used to make the development commands easy to remember and use

- Prettier and ESLint (Airbnb preferences) used for best coding practices

- Auth0 used for user authentication/authorization

- Google Analytics used to track site statistics

## Where is the Backend?

The Backend of HyperPlanner uses Hasura, which is an open source engine connecting our PostgreSQL Database to our GraphQL Backend. This is hosted on Heroku, located [here](https://hyperplanner.herokuapp.com/console). The Frontend communicates with the GraphQL engine using Apollo Client.

![Diagram](https://iili.io/J4B7N2.png)

![Authentication](https://iili.io/JLmraR.png)

![Database](https://iili.io/JP2d8l.png)

## What is the development workflow?

First clone the repository onto your local machine.
You can then run the following commands:

#### `npm run start`

Runs the app in the development mode with live updates.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run format:fix`

Formats the files with Prettier.<br />

#### `npm run lint:fix`

Lints the files with ESLint.<br />

#### `npm run test`

Runs the test suite. Make sure that all tests pass before committing/pushing!<br />



