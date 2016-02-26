import Future from './'

const rejected = value => Future(reject => reject(value))

export default rejected
