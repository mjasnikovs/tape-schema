const test = require('tape')
const schema = require('../index.js')

const schemaObject = [
	{
		id: schema.naturalNumber,
		name: schema.string
	}
]

const object = []

test('empty', t => {
	schema.test(t, schemaObject, object)
	t.end()
})
