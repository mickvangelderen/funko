export const Delayed = task => ({
	map: f => Delayed(resolve => task(value => resolve(f(value)))),
	chain: f => Delayed(resolve => task(value => f(value).resolve(resolve))),
	resolve: task
})

export default Delayed
