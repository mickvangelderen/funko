import rawCurry from '../internal/raw-curry'

const curry = rawCurry(2, rawCurry)

export default curry
