import defaults from '../defaults'

const guardModuleExports = exports =>
	exports.__esModule === true ?
		exports['default'] :
		exports

const specifics = Object.assign(
	{}, 
	defaults,
	guardModuleExports(require(
		process.env.NODE_ENV && process.env.NODE_ENV !== 'development' ?
			'../environments' :
			'../locals'
	))
)

export default specifics
