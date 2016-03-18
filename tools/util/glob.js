import curry from 'funko/lib/curry'
import Future from 'funko/lib/future'
import originalGlob from 'glob'

const glob = curry(2, (options, pattern) =>
	Future((reject, resolve) => {
		originalGlob(pattern, options, (error, files) =>
			error ? reject(error) : resolve(files))
	})
)

export default glob
