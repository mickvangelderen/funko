import Just from './just'
import Nothing from './nothing'

const maybeFromUndefined = value => typeof value === 'undefined' ? Nothing() : Just(value)

export default maybeFromUndefined
