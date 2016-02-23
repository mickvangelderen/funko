import Failure from './failure'
import Success from './success'

const eitherFromCatch = f => {
	try {
		return Success(f())
	} catch (error) {
		return Failure(error)
	}
}

export default eitherFromCatch
