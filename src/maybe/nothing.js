export const Nothing = () => ({
	map: () => Nothing(),
	chain: () => Nothing(),
	otherwise: value => value
})

export default Nothing
