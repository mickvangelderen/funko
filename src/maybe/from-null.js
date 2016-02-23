import Just from './just'
import Nothing from './nothing'

const maybeFromNull = value => value === null ? Nothing() : Just(value)

export default maybeFromNull
