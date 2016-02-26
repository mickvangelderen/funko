import Success from './success'
import Failure from './failure'

const eitherFromDefinable = value => value === undefined ? Failure(value) : Success(value)

export default eitherFromDefinable
