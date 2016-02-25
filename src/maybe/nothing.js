const Nothing = () => ({
	chain: () => Nothing(),
	chainBoth: f => f(),
	chainLeft: f => f(),
	map: () => Nothing(),
	otherwise: value => value
})

export default Nothing
