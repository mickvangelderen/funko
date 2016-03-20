import curry from '../../src/curry'
import Future from '../../src/future'
import originalGlob from 'glob'

const glob = curry(2, (options, pattern) =>
	Future((reject, resolve) => {
		originalGlob(pattern, options, (error, files) =>
			error ? reject(error) : resolve(files))
	})
)

export default glob
