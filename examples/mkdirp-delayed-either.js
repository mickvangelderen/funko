import chain from 'funko/lib/chain'
import Delayed from 'funko/lib/delayed'
import Failure from 'funko/lib/either/failure'
import forkEither from 'funko/lib/either/fork'
import fs from 'fs'
import path from 'path'
import pipe from 'funko/lib/pipe'
import Success from 'funko/lib/either/success'

const parentDirectory = path.dirname

const stat = path => Delayed(resolve =>
	fs.stat(path, (error, stat) =>
		resolve(error ? Failure(error) : Success(stat))
	)
)

const mkdir = path => Delayed(resolve =>
	fs.mkdir(path, error =>
		resolve(error ? Failure(error) : Success(path))
	)
)

const delayedValue = value => Delayed(resolve => resolve(value))

const mkdirp = path => pipe([
	// String
	stat,
	// Delayed Either Error Stat
	chain(
		// Either Error Stat
		forkEither(
			error => error && error.code === 'ENOENT' ?
				// Path does not exist, create parent path.
				mkdirp(parentDirectory(path))
				.chain(() => mkdir(path)) :
				// Leave other errors intact.
				delayedValue(Failure(error))
			,
			stat => delayedValue(stat.isDirectory() ?
				// Directory already exists.
				Success(path) :
				// Path exists but it is a file.
				Failure(new Error(`Cannot create directory because ${path} is a file.`))
			)
		)
		// Delayed Either Error String
	)
], path)

mkdirp('a/b/c')
.resolve(forkEither(
	console.error,  // eslint-disable-line no-console
	console.log  // eslint-disable-line no-console
))
