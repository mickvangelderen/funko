import Just from './just'
import Nothing from './nothing'

const maybeFromNaN = value => Number.isNaN(value) ? Nothing() : Just(value)

export default maybeFromNaN
