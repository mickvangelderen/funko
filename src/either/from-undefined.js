import Failure from './failure'
import Success from './success'

const eitherFromUndefined = value => typeof value === 'undefined' ? Failure(value) : Success(value)

export default eitherFromUndefined
