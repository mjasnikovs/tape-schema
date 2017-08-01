# tape-schema
tap-producing test harness schema validation for node

## install
```
npm install --save-dev tape-schema
```

## example
```JS
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

test('Readme test', t => {
	schema.test(t, schemaObject, object)
	t.end()
})
```

## API

### schema.test([tape], [schema], [object])
Validate schema agains given object

### string
Specifies that the input is an typeof string.
```JS
const schema = {
 	name: schema.string
}
```

### number
Specifies that the input is number.
```JS
const schema = {
 	discount: schema.number
}
```

### naturalNumber
Specifies that the input is natural number. (including 0)
```JS
const schema = {
 	age: schema.naturalNumber
}
```

### boolean
Specifies that the input is boolean.
```JS
const schema = {
 	isOnline: schema.boolean
}
```

### any
Specifies that the input is any value in array.
```JS
const schema = {
 	task: schema.any([null, schema.string, 'assigned'])
}
```

### latitude
Specifies that the input is latitude.
```JS
const schema = {
 	latitude: schema.latitude
}
```

### longitude
Specifies that the input is longitude.
```JS
const schema = {
 	longitude: schema.longitude
}
```

### func
Specifies that the input is typeof function.
```JS
const schema = {
 	foo: schema.func
}
```