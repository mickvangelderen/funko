import Just from './just'
import Nothing from './nothing'

export const maybeFromNaN = value => Number.isNaN(value) ? Nothing() : Just(value)

export default maybeFromNaN
