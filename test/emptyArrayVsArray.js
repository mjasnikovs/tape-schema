const test = require('tape')
const schema = require('../index.js')

const schemaObject = []

const object = [{id: 'string'}]

test('emptyArrayVsArray', t => {
	t.plan(1)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}
	schema.test(fakeTape, schemaObject, object)
})
