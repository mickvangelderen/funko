import Failure from './failure'
import Success from './success'

export const eitherFromNaN = value => isNaN(value) ? Failure(value) : Success(value)

export default eitherFromNaN
