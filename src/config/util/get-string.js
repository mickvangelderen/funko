import assert from 'assert'
import specifics from './specifics'

const getString = key => {
	const value = process.env[key] || specifics[key]
	assert.strictEqual(typeof value, 'string', `Expected configuration variable ${key} to be a string but it equals ${JSON.stringify(value)} with environment ${JSON.stringify(process.env.NODE_ENV)}.`)
	return value
}

export default getString
