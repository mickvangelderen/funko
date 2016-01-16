import Just from './just'
import Nothing from './nothing'

export const maybeFromCatch = func => {
	try {
		return Just(func())
	} catch (error) {
		return Nothing()
	}
}

export default maybeFromCatch
