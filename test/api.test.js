const test = require('tape')
const schema = require('../index.js')

const schemaObject = {
	string: schema.string,
	number: schema.number,
	naturalNumber: schema.naturalNumber,
	boolean: schema.boolean,
	any: schema.any([1, 2, 3]),
	latitude: schema.latitude,
	longitude: schema.longitude,
	func: schema.func,
	regexTest: schema.regexTest(/^test$/),
	undef: schema.undef
}

const object = {
	string: 'string',
	number: 1.10,
	naturalNumber: 10,
	boolean: false,
	any: 2,
	latitude: 80,
	longitude: 80,
	func: () => {return null},
	regexTest: 'test',
	undef: undefined
}

test('api', t => {
	schema.test(t, schemaObject, object)
	t.end()
})
