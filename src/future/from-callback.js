import Future from './'

const futureFromCallback = creator => Future((reject, resolve) =>
	creator((error, value) => error ? reject(error) : resolve(value))
)

export default futureFromCallback
