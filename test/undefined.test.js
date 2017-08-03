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
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaObject, object)
	t.end()
})
