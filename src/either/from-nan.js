import Failure from './failure'
import Success from './success'

const eitherFromNaN = value => isNaN(value) ? Failure(value) : Success(value)

export default eitherFromNaN
