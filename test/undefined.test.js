const test = require('tape')
const schema = require('../index.js')

const undefinedObject = {}

const schemaObject = {
	target: undefinedObject.undef
}

const object = {
	target: 1
}

test('undefined', t => {
	t.plan(1)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaObject, object)
})
