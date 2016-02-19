import path from 'path'

function relativePath(p) {
	return path.relative(process.cwd(), p)
}

export default relativePath
