import Failure from './failure'
import Success from './success'

const eitherFromNull = value => value === null ? Failure(value) : Success(value)

export default eitherFromNull
