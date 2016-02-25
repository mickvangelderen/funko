const Future = task => ({
	map: rightFunc => Future((reject, resolve) =>
		task(reject, value => resolve(rightFunc(value)))
	),
	mapLeft: leftFunc => Future((reject, resolve) =>
		task(value => reject(leftFunc(value)), resolve)
	),
	mapBoth: (leftFunc, rightFunc) => Future((reject, resolve) =>
		task(
			value => reject(leftFunc(value)),
			value => resolve(rightFunc(value))
		)
	),
	chain: rightFunc => Future((reject, resolve) =>
		task(reject, value => rightFunc(value).fork(reject, resolve))
	),
	chainLeft: leftFunc => Future((reject, resolve) =>
		task(value => leftFunc(value).fork(reject, resolve), resolve)
	),
	chainBoth: (leftFunc, rightFunc) => Future((reject, resolve) =>
		task(
			value => leftFunc(value).fork(reject, resolve),
			value => rightFunc(value).fork(reject, resolve)
		)
	),
	fork: task
})

export default Future
