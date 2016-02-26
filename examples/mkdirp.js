import chainBoth from 'funko/lib/chain-both'
import fs from 'fs'
import Future from 'funko/lib/future'
import futureFromCallback from 'funko/lib/future/from-callback'
import path from 'path'
import pipe from 'funko/lib/pipe'
import rejected from 'funko/lib/future/rejected'
import resolved from 'funko/lib/future/resolved'

const parentDirectory = path.dirname

const stat = path =>
	futureFromCallback(callback => fs.stat(path, callback))

const mkdir = path =>
	Future((reject, resolve) =>
		fs.mkdir(path, error =>
			error ? reject(error) : resolve(path)
		)
	)

const mkdirp = path => pipe([
	// String
	stat,
	// Future Error Stat
	chainBoth(
		error => error && error.code === 'ENOENT' ?
			// Path does not exist, create parent path.
			mkdirp(parentDirectory(path))
			.chain(() => mkdir(path)) :
			// Leave other errors intact.
			rejected(error)
		,
		stat => stat.isDirectory() ?
			// Directory already exists.
			resolved(path) :
			// Path exists but it is a file.
			rejected(new Error(`Cannot create directory because ${path} is a file.`))
	)
	// Future Error Stat
], path)

mkdirp('a/b/c')
.fork(console.error, console.log) // eslint-disable-line no-console

