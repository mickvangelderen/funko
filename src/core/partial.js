import rawCurry from '../internal/raw-curry'
import rawPartial from '../internal/raw-partial'

export const partial = rawCurry(2, rawPartial)

export default partial
