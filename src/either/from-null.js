import Left from './failure'
import Right from './success'

const eitherFromNull = value => value === null ? Left(value) : Right(value)

export default eitherFromNull
