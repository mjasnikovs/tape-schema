const test = require('tape')
const schema = require('../index.js')

const schemaObject = {}

test('stringOverflow string', t => {
	t.plan(1)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaObject, 'overflow')
})

test('stringOverflow number', t => {
	t.plan(1)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaObject, 123456)
})

test('stringOverflow boolean', t => {
	t.plan(1)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}

	schema.test(fakeTape, schemaObject, true)
})
