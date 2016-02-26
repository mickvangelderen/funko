import Success from './success'
import Failure from './failure'

const eitherFromBoolean = value => value === false ? Failure(value) : Success(value)

export default eitherFromBoolean
