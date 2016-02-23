# Development guide

This guide is for people who want to modify funko.

## Setup

This project requires a recent version of `node`, `npm` and `git`. It also requires the commands  `rm` and `cp` to be available.

* `git clone https://github.com/mickvangelderen/funko` to get the code.
* `npm run setup` to configure git. 

The `npm run setup` command installs git hooks so you don't forget to do  lint, test and sort configuration files when committing and to check your node version, update, dedupe and check for possible dependency updates when pulling. It also enables the `--follow-tags` flag for git so you don't forget to push tags. 

## Code

The code can be found in the [`src/`](src) directory. It will be transpiled to the `lib/` directory which is ignored by `git` but not by `npm`. 

## Scripts

You can always inspect the `package.json` or issue `npm run` to view the available scripts but here is an overview:

* `npm run build`: Build this project.
* `npm run check-node-version`: Check your node version.
* `npm run clean`: Remove built assets.
* `npm run lint`: Check code syntax and style. 
* `npm run setup`: Run after cloning.
* `npm run sort-configuration-files`: Sort files to minimize merge conflicts.
* `npm run test`: Check version, lint and test.

## Versioning and publishing

Simply use [`npm version <version>`](https://docs.npmjs.com/cli/version) and [`npm publish`](https://docs.npmjs.com/cli/publish). 

## Tools

* Asserted with [must](https://www.npmjs.com/package/must).
* Linted with [eslint](http://eslint.org/) and its recommended settings which I feel are good enough.
* Tested with [mocha](http://mochajs.org/).
* Transpiled with [babel](https://babeljs.io/) from es2015 to node5. 
