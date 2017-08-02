const test = require('tape')
const schema = require('../index.js')

const schemaObject = {
	id: schema.number,
	name: schema.string,
	age: schema.any([null, schema.naturalNumber]),
	friendList: [
		{
			id: schema.number,
			name: schema.string
		}
	]
}

const object = {
	id: 1,
	name: 'Edgars',
	age: null,
	friendList: [
		{
			id: 2,
			name: 'Joe'
		},
		{
			id: 3,
			name: 'Kate'
		}
	]
}

test('readme', t => {
	schema.test(t, schemaObject, object)
	t.end()
})
