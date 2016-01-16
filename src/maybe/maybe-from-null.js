import Just from './just'
import Nothing from './nothing'

export const maybeFromNull = value => value === null ? Nothing() : Just(value)

export default maybeFromNull
