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
	t.plan(2)
	schema.test(t, schemaObject, object)
})
