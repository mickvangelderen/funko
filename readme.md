# Usage guide

This guide is for people who want to use funko. 

Other guides:
* [Development guide](development.md)

## Install

`npm install funko`

## Usage

```js
import pipe from 'funko/lib/pipe'

const doMath = pipe([
    x => 4*x,
    x => 2 + x,
])

doMath(10) // 42
```

## Thanks

This project uses [node-package-skeleton](https://github.com/mickvangelderen/node-package-skeleton) as a starting point for package development. 
