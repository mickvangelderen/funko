import Future from './'

const resolved = value => Future((reject, resolve) => resolve(value))

export default resolved
