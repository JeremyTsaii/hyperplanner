# HyperPlanner

***

The Web App for planning/reviewing all 4 years of college!

List of currently-supported schools:
- Harvey Mudd College

[![forthebadge](https://forthebadge.com/images/badges/built-with-grammas-recipe.svg)](https://forthebadge.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c938739e-15ab-4c97-9e21-217e6acdbe13/deploy-status)](https://app.netlify.com/sites/hyperplanner/deploys)

[![Build Status](https://travis-ci.com/JeremyTsaii/hyperplanner.svg?branch=master)](https://travis-ci.com/JeremyTsaii/hyperplanner)

[![Maintainability](https://api.codeclimate.com/v1/badges/80bb8a05abd8bfa7b70b/maintainability)](https://codeclimate.com/github/JeremyTsaii/hyperplanner/maintainability)

[![codecov](https://codecov.io/gh/JeremyTsaii/hyperplanner/branch/master/graph/badge.svg)](https://codecov.io/gh/JeremyTsaii/hyperplanner)

[![HitCount](http://hits.dwyl.com/JeremyTsaii/hyperplanner.svg)](http://hits.dwyl.com/JeremyTsaii/hyperplanner)

[![Dependency Status](https://david-dm.org/JeremyTsaii/hyperplanner.svg)](https://david-dm.org/JeremyTsaii/hyperplanner)

[![devDependency Status](https://david-dm.org/JeremyTsaii/hyperplanner/dev-status.svg)](https://david-dm.org/JeremyTsaii/hyperplanner#info=devDependencies)

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## How was this developed?

- Frontend of HyperPlanner made using TypeScript and React

- Netlify used for deployment of the web app

- Travis CI used for CI/CD tests

- Jest used for unit test

- Code Coverage and Code Climate used to assess the maintainability of the code and the coverage of tests

- Docker used to create a consistent development environment

- Makefile used to make the development commands easy to remember and use

- Prettier and ESLint (Airbnb preferences) used for best coding practices

- Google Analytics used to track site statistics

## What is the development workflow?

First clone the repository onto your local machine. Note that on Windows, if using Git Bash, you will need to install Make. Look [here](https://gist.github.com/evanwill/0207876c3243bbb6863e65ec5dc3f058) for more information on installing Make. You will also need to have [Docker](https://www.docker.com/products/docker-desktop) downloaded.
You can then run the following commands:

#### `make build`

Creates the Docker development container.<br />

#### `make serve`

Runs the app in the development mode with live updates.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `make format`

Formats the files with Prettier.<br />

#### `make lint`

Lints the files with ESLint.<br />





