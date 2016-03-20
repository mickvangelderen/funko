import chalk from 'chalk'
import ConsoleWriter from 'log-2000/lib/console-writer-factory'
import Log from 'log-2000'
import moment from 'moment'
import util from 'util'

const getChalk = level => {
	switch(level) {
		case 'error': return chalk.red
		case 'info': return chalk.green
		case 'warning': return chalk.yellow
	}
	return string => string
}

const objectToColoredString = (level, data) => {
	const mask = [ 'message', 'date', 'level']
	const {
		message = '',
		date = new Date()
	} = data

	const remainingKeys = Object.keys(data)
	.filter(key => mask.indexOf(key) === -1)

	const remainingData = remainingKeys
	.reduce((map, key) => {
		map[key] = data[key]
		return map
	}, {})

	const extraMessage = remainingKeys.length === 0 ? '' : ' ' + util.inspect(remainingData)

	const coloredDate = getChalk(level)(`[${moment(date).format('HH:mm:ss')}]`)
	return `${coloredDate} ${message}${extraMessage}`
}

export default Log({
	writers: [
		ConsoleWriter({
			transformers: [ objectToColoredString ]
		})
	]
})
