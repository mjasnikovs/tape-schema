const test = require('tape')
const schema = require('../index.js')

test('string', t => {
	const objectTarget = {
		id: schema.number,
		name: schema.string
	}

	const target = {
		string: schema.string,
		number: schema.number,
		naturalNumber: schema.naturalNumber,
		boolean: schema.boolean,
		anyWithString: schema.any([schema.string, schema.number]),
		anyWithNumber: schema.any([schema.string, schema.number]),
		directTrue: true,
		directFalse: false,
		directString: 'String',
		directNumber: 'Number',
		arrayWrongTarget: [schema.any([null, objectTarget])],
		friendList: [
			{
				id: schema.number,
				name: schema.string,
				friends: [schema.number]
			}
		]
	}

	const object = {
		string: 'Some string',
		number: 1,
		naturalNumber: 1,
		boolean: true,
		anyWithString: 'Any string',
		anyWithNumber: 2,
		directTrue: true,
		directFalse: false,
		directString: 'String',
		directNumber: 'Number',
		arrayTarget: ['One', 'Two', null],
		arrayWrongTarget: [null, {id: 1, name: 'Edgars'}],
		friendList: [
			{
				id: 1,
				name: 'Edgars',
				friends: [4, 2, 3]
			},
			{
				id: 2,
				name: 'Joe',
				friends: [1, 4, 3]
			}
		]
	}

	schema.test(t, target, object)

	t.end()
})
