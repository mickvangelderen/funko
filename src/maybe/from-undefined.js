import Just from './just'
import Nothing from './nothing'

const maybeFromUndefined = value => value === undefined ? Nothing() : Just(value)

export default maybeFromUndefined
