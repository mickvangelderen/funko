import Left from './failure'
import Right from './success'

const eitherFromNaN = value => isNaN(value) ? Left(value) : Right(value)

export default eitherFromNaN
