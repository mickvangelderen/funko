import Just from './just'
import Nothing from './nothing'

const maybeFromBool = value => value === false ? Nothing() : Just(value)

export default maybeFromBool
