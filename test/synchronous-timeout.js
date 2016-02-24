const SynchronousTimeout = () => {
	let currentTime = 0
	let timers = {}
	return {
		setTimeout(func, delay) {
			if (delay <= 0) throw new RangeError(`Expected delay to be more than 0 but got ${delay}.`)
			const key = currentTime + delay
			const target = timers.hasOwnProperty(key) ?
				timers[key] : timers[key] = []
			target.push(func)
		},
		advance() {
			const candidates = Object.keys(timers)
			.map(Number)
			.filter(time => time > currentTime)
			.sort()
			if (candidates.length > 0) {
				currentTime = candidates[0]
				timers[currentTime].forEach(func => func())
			}
			return currentTime
		}
	}
}

export default SynchronousTimeout
