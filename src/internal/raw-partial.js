export const rawPartial = (argu, func) =>
	argu.length === 0 ?
		func :
		(...ments) => func(...argu, ...ments)

export default rawPartial
