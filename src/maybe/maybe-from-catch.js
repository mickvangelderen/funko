import Just from './just'
import Nothing from './nothing'

const maybeFromCatch = func => {
	try {
		return Just(func())
	} catch (error) {
		return Nothing()
	}
}

export default maybeFromCatch
