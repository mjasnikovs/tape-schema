const test = require('tape')
const schema = require('../index.js')

const schemaObject = {
}

const object = {
	data: true,
	overflowData: true,
	overflowObject: {
		data: true
	},
	overflowArray: [],
	overflowDeepArray: [{id: 1}, {id: 2, name: 'Edgars'}, {id: 3}]
}

test('overflow', t => {
	t.plan(5)
	const fakeTape = {
		equal: (value, target, msg) => t.notEqual(value, target, msg)
	}
	schema.test(fakeTape, schemaObject, object)
})
