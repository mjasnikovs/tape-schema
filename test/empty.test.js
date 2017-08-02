const test = require('tape')
const schema = require('../index.js')

const schemaEmptyArray = [
	{
		id: schema.naturalNumber,
		name: schema.string
	}
]

test('empty array', t => {
	t.plan(1)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaEmptyArray, [])
})

const schemaEmptyObject = {
	id: schema.naturalNumber,
	name: schema.string
}

test('empty object', t => {
	t.plan(2)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaEmptyObject, {})
})
