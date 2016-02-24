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

## Q&A

Q: There are people who know more of functional programming and create better libraries than you, why did you create funko?

A: As a beginner I got lost in the large number of functions that exist in these libraries. I just wanted to know what functions are most important when starting out with functional programming. Another problem I faced was that the implementation of these libraries can sometimes be difficult to read and understand. As a result, funko exposes a relatively small set of functions and monads and its implementation is as easy to understand as I could make it. 

## Thanks

Thank you:

 * [Avaq](https://github.com/Avaq) for introducing me to functional programming, 
 * [Dr Boolean](https://github.com/DrBoolean) for your [mostly adequate guide](https://drboolean.gitbooks.io/mostly-adequate-guide/content/), 
 * [Ramda](http://ramdajs.com/) for letting me play with your functions,
 * [Babel](https://babeljs.io/) for letting me use ES2015,
 * [node-package-skeleton](https://github.com/mickvangelderen/node-package-skeleton) for the starting point for package development. 
