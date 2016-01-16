import Just from './just'
import Nothing from './nothing'

export const maybeFromUndefined = value => typeof value === 'undefined' ? Nothing() : Just(value)

export default maybeFromUndefined
