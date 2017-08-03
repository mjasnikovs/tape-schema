const test = require('tape')
const schema = require('../index.js')

const schemaObject = [
	[
		schema.number,
		schema.string
	]
]

const object = [
	[
		1,
		'edgars'
	]
]

test('arrayInArray', t => {
	schema.test(t, schemaObject, object)
	t.end()
})
