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
* `npm run resume`: Run when you resume working on your package.
* `npm run setup`: Run after cloning.
* `npm run sort`: Sort files to minimize merge conflicts.
* `npm run test`: Check version, lint and test.

## Hooks

The following git hooks are installed by running `npm run setup`:

* [post-checkout](tools/hooks/post-checkout): Simply runs `npm run post-checkout`.
* [post-merge](tools/hooks/post-merge): Simply runs `npm run post-merge`.
* [pre-commit](tools/hooks/pre-commit): Simply runs `npm run pre-commit`.

## Versioning and publishing

Simply use [`npm version <version>`](https://docs.npmjs.com/cli/version) and [`npm publish`](https://docs.npmjs.com/cli/publish). 

## Tools

* Asserted with [must](https://www.npmjs.com/package/must).
* Linted with [eslint](http://eslint.org/) and its recommended settings which I feel are good enough.
* Tested with [mocha](http://mochajs.org/).
* Transpiled with [babel](https://babeljs.io/) from es2015 to node5. 
