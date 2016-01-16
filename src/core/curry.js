import rawCurry from '../internal/raw-curry'

export const curry = rawCurry(2, rawCurry)

export default curry
