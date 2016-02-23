import Left from './failure'
import Right from './success'

const eitherFromUndefined = value => value === undefined ? Left(value) : Right(value)

export default eitherFromUndefined
