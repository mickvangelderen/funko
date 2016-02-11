# Node Package Skeleton

Inspired by [Node Server Skeleton](https://github.com/Avaq/node-server-skeleton). 

## Get it running

* Make sure you have node and npm. 
* Get a recent version of node and npm with `npm install -g n && n latest`.
* Clone the repo `https://github.com/Avaq/node-server-skeleton.git`.
* Modify the package.json as you see fit.

## Scripts

You can always inspect the `package.json` or issue `npm run` to view the available scripts but here is an overview:

* `npm run build`: Transpile es2015 to node 5. 
* `npm run check-node-version`: Check the node version.
* `npm run clean`: Remove the transpiled code.
* `npm run pull`: Pull code, check version and then install, dedupe, and check for outdated dependencies. 
* `npm run push`: Test and push code and tags.
* `npm run test`: Check version, lint and test.

## Testing

* Tested with [mocha](http://mochajs.org/).
* Asserted with [must](https://www.npmjs.com/package/must).

## Linting

* Linted with [eslint](http://eslint.org/) and its recommended settings which I feel are good enough.
* Parsed with [babel-eslint](https://www.npmjs.com/package/babel-eslint).

## Transpiling

* Transpiles ES2015 to node 5 compatible code using [babel](https://babeljs.io/).
