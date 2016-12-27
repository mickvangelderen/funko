import { inspect } from 'util'

const captureStackTrace = Error.captureStackTrace || function() {}

function assertFunction(value) {
	if (typeof value === 'function') return value
	const error = new TypeError(`Expected a function but got ${inspect(value)}.`)
	captureStackTrace(error, assertFunction)
	throw error
}

function assertForkable(value) {
	if (value && typeof value.fork === 'function' && value.fork.length === 2) return value
	const error = new TypeError(`Expected an object with a fork method of arity 2 but got ${inspect(value)}.`)
	captureStackTrace(error, assertForkable)
	throw error
}

class Future {
	constructor(task) {
		this._task = assertFunction(task)
	}

	map(rightMapper) {
		assertFunction(rightMapper)
		return new Future((reject, resolve) =>
			this._task(reject, value => resolve(rightMapper(value)))
		)
	}

	mapLeft(leftMapper) {
		assertFunction(leftMapper)
		return new Future((reject, resolve) =>
			this._task(value => reject(leftMapper(value)), resolve)
		)
	}

	mapBoth(leftMapper, rightMapper) {
		assertFunction(leftMapper)
		assertFunction(rightMapper)
		return new Future((reject, resolve) => 
			this._task(
				value => reject(leftMapper(value)),
				value => resolve(rightMapper(value))
			)
		)
	}

	chain(rightChainer) {
		assertFunction(rightChainer)
		return new Future((reject, resolve) =>
			this._task(reject, value => assertForkable(rightChainer(value)).fork(reject, resolve))
		)
	}

	chainLeft(leftChainer) {
		assertFunction(leftChainer)
		return new Future((reject, resolve) => 
			this._task(value => assertForkable(leftChainer(value)).fork(reject, resolve), resolve)
		)
	}

	chainBoth(leftChainer, rightChainer) {
		assertFunction(leftChainer)
		assertFunction(rightChainer)
		return new Future((reject, resolve) => 
			this._task(
				value => assertForkable(leftChainer(value)).fork(reject, resolve),
				value => assertForkable(rightChainer(value)).fork(reject, resolve)
			)
		)
	}

	fork(reject, resolve) {
		assertFunction(reject)
		assertFunction(resolve)
		return this._task(reject, resolve)
	}
}

function FutureFactory(task) {
	return new Future(task)
}

export default FutureFactory
