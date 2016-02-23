import Left from './failure'
import Right from './success'

const eitherFromBool = value => value === false ? Left(value) : Right(value)

export default eitherFromBool
