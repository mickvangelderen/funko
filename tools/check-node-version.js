import assert from 'assert'
import pkg from '../package'
import semver from 'semver'
import log from './util/log'

try {
	const engines = pkg.engines

	assert(engines && typeof engines === 'object', `Expected package.json to have an "engines" field.`)

	const pattern = engines.node

	assert(typeof pattern === 'string', `Expected "engines" object in package.json to have key "node" that is a string.`)

	const value = process.versions.node

	assert(semver.satisfies(value, pattern), `Expected node version to satisfy semver ${pattern} but got ${value}. Install the correct version and issue "npm run post-merge".`)

	log.info(`Running node version ${value} which satisfies ${pattern}.`)
} catch (error) {
	log.error(error.message)
	process.exitCode = 1
}
