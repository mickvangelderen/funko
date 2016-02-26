import Success from './success'
import Failure from './failure'

const eitherFromNumber = value => Number.isNaN(value) ? Failure(value) : Success(value)

export default eitherFromNumber
