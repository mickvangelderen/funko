import Just from './just'
import Nothing from './nothing'

const maybeFromNumber = value => Number.isNaN(value) ? Nothing() : Just(value)

export default maybeFromNumber
