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

test('empty array vs empty array schema', t => {
	schema.test(t, {array: []}, {array: []})
	t.end()
})

test('empty array vs empty array schema invalid', t => {
	t.plan(1)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, {array: []}, {array: [null]})
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
