import Just from './just'
import Nothing from './nothing'

const maybeFromDefinable = value => value === undefined ? Nothing() : Just(value)

export default maybeFromDefinable
