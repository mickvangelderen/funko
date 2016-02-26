import Success from './success'
import Failure from './failure'

const eitherFromNullable = value => value === null ? Failure(value) : Success(value)

export default eitherFromNullable
