
import fs from 'fs'


export const SyncTask = task => ({
	map: func => SyncTask(() => func(task())),
	chain: func => SyncTask(() => func(task()).run()),
	run: () => task()
})

// readFile :: string -> AsyncTask Either Error|string
const readFile = wrapCallbackFunction(fs.readFile.bind(fs))

const pipe = funcs =>
	arg => funcs.reduce((a, f) => f(a), arg)

const map = func =>
	mappable => mappable.map(func)

const resolve = func =>
	resolvable => resolvable.resolve(func)

const join = separator =>
	joinable => joinable.join(separator)

const id = x => x

const prop = name => obj => obj[name]

pipe([
	// List string
	map(path => readFile(path)),
	// List Task Either Error|Buffer
	AsyncTask.parallel,
	// Task List Either Error|Buffer
	map(pipe([
		// List Either Error|Buffer
		map(pipe([
			// Either Error|Buffer
			map(buffer => buffer.toString().substr(0, 10).trim()),
			// Either Error|string
			either => either.fork(prop('stack'), id)
			// string
		])),
		// List string
		join('\n\n')
		// string
	])),
	// Task string
	resolve(console.log)
])([ 'package.json', 'non-existing-file', '.babelrc' ])



const listRecursive = function(path, callback) {
	fs.stat(path, function(error, stat) {
		if (error) return callback(error)
		if (stat.isFile()) return callback(null, [ path ])
		if (stat.isDirectory()) {
			fs.readdir(path, function(error, entries) {
				if (error) return callback(error)
				if (entries.length === 0) return callback(null, [])
				let todo = entries.length
				let files = []
				entries.forEach(function(entry) {
					listRecursive(joinPath(path, entry), function(error, subEntries) {
						if (error) return callback(error)
						files = files.concat(subEntries)
						if (--todo <= 0) callback(null, files)
					})
				})
			})
		} else {
			return callback(new Error('Stat of ' + JSON.stringify(path) + ' is not a file nor a directory.'))
		}
	})
}
