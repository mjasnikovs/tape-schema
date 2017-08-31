const test = require('tape')
const schema = require('../index.js')

const schemaObject = [1, 2]

const object = [1, 2, 'overflow']

test('directArrayVsArray', t => {
	t.plan(1)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaObject, object)
})
