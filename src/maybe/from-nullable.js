import Just from './just'
import Nothing from './nothing'

const maybeFromNullable = value => value === null ? Nothing() : Just(value)

export default maybeFromNullable
