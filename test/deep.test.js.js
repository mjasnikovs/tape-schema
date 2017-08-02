const test = require('tape')
const schema = require('../index.js')

const schemaObject = {
	object: {
		target: {
			value: schema.naturalNumber
		}
	},
	array: {
		target: {
			value: [{id: schema.naturalNumber, name: schema.string}]
		}
	},
	any: {
		target: {
			value: [schema.any([null, schema.number, {id: schema.naturalNumber, name: schema.string}])]
		}
	},
	anyArray: [
		[
			schema.any([null, {id: schema.naturalNumber, name: schema.string}])
		]
	]

}

const object = {
	object: {
		target: {
			value: 1
		}
	},
	array: {
		target: {
			value: [{id: 1, name: 'Edgars'}, {id: 2, name: 'Joe'}]
		}
	},
	any: {
		target: {
			value: [
				null,
				10,
				{id: 1, name: 'Edgars'},
				{id: 2, name: 'Joe'}
			]
		}
	},
	anyArray: [
		[
			{id: 1, name: 'Edgars'},
			{id: 2, name: 'Joe'},
			null
		]
	]
}

test('deep', t => {
	schema.test(t, schemaObject, object)
	t.end()
})
