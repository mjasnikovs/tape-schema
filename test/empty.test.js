const test = require('tape')
const schema = require('../index.js')

const schemaEmptyArray = [
	{
		id: schema.naturalNumber,
		name: schema.string
	}
]

test('empty array', t => {
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaEmptyArray, [])
	t.end()
})

test('empty array vs empty array schema', t => {
	schema.test(t, {array: []}, {array: []})
	t.end()
})

test('empty array vs empty array schema invalid', t => {
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, {array: []}, {array: [null]})
	t.end()
})

const schemaEmptyObject = {
	id: schema.naturalNumber,
	name: schema.string
}

test('empty object', t => {
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaEmptyObject, {})
	t.end()
})

test('empty object vs empty object schema', t => {
	schema.test(t, {object: {}}, {object: {}})
	t.end()
})

test('empty object vs empty object schema invalid', t => {
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, {object: {}}, {object: {id: null}})
	t.end()
})
