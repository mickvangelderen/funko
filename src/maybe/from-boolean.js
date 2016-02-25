import Just from './just'
import Nothing from './nothing'

const maybeFromBoolean = value => value === false ? Nothing() : Just(value)

export default maybeFromBoolean
