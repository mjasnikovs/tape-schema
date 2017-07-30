const test = require('tape')
const schema = require('../index.js')

test('string', t => {
	const objectTarget = {
		id: schema.any([schema.number, null]),
		name: schema.string
	}

	const target = {
		string: schema.string,
		number: schema.number,
		anyWithString: schema.any([schema.string, schema.number]),
		anyWithNumber: schema.any([schema.string, schema.number]),
		directTrue: true,
		directFalse: false,
		directString: 'String',
		directNumber: 'Number',
		arrayWrongTarget: [schema.any([schema.string, [objectTarget]])]
	}

	const object = {
		string: 'Some string',
		number: 1,
		anyWithString: 'Any string',
		anyWithNumber: 2,
		directTrue: true,
		directFalse: false,
		directString: 'String',
		directNumber: 'Number',
		arrayTarget: ['One', 'Two', null],
		arrayWrongTarget: ['apple', [{id: 1, name: 'Edgars'}, {id: null, name: 'Joe'}]]
	}

	schema.test(t, target, object)

	t.end()
})
