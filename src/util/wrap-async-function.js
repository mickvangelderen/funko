import Delayed from '../delayed/delayed'
import Failure from '../either/failure'
import Success from '../either/success'

const wrapAsyncFunction = call =>
	(...args) =>
		Delayed(resolve => {
			try {
				call(...args, (error, value) => 
					resolve(error ? Failure(error) : Success(value))
				)
			} catch (error) {
				resolve(Failure(error))
			}
		})

export default wrapAsyncFunction
