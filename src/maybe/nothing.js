const Nothing = () => ({
	chain: () => Nothing(),
	chainNothing: f => f(),
	map: () => Nothing(),
	mapNothing: f => Nothing(f()),
	otherwise: value => value
})

export default Nothing
